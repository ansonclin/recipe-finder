require('dotenv').config()
const axios = require('axios');
const Anthropic = require('@anthropic-ai/sdk');
const anthropic = new Anthropic();
const express = require('express');
const { YoutubeTranscript } = require('youtube-transcript');
const app = express();

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/search', async (req, res) => {
  const ingredients = req.query.ingredients;
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      key: process.env.YOUTUBE_API_KEY,
      q: `${ingredients} recipe`,
      part: 'snippet',
      type: 'video',
      maxResults: 10
    }
  });

  const ingredientKeywords = ['cup', 'tablespoon', 'teaspoon', 'tbsp', 'tsp', 'grams', 'oz', 'pound', 'clove', 'garlic', 'onion', 'salt', 'pepper', 'oil', 'butter', 'flour', 'chicken', 'beef', 'pork', 'fish', 'egg', 'milk', 'cheese', 'rice', 'pasta'];

  const filtered = [];
  for (const video of response.data.items) {
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(video.id.videoId);
      const transcriptText = transcript.map(t => t.text).join(' ').toLowerCase();
      const wordCount = transcriptText.split(' ').length;
      const hasIngredients = ingredientKeywords.filter(k => transcriptText.includes(k)).length >= 3;
      if (wordCount >= 200 && hasIngredients) {
        filtered.push(video);
      }
    } catch (e) {
      // no transcript, skip
    }
  }

  res.json(filtered);
});


app.get('/api/analyze', async (req, res) => {
  const title = req.query.title;               // take title, description, and video ID as input
  const description = req.query.description;
  const videoId = req.query.videoId;

  let context = description;

    try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const transcriptText = transcript.map(t => t.text).join(' ');
    const wordCount = transcriptText.split(' ').length;
    if (wordCount < 200) {
      return res.json({ skip: true });
    }
    context = transcriptText.slice(0, 2000);
  } catch (e) {
    if (!description || description.length < 80) {
      return res.json({ skip: true });
    }
    context = description;
  }



  const message = await anthropic.messages.create({         // Claude summary 
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    messages: [{
      role: 'user',
      content: `You are analyzing a YouTube recipe video transcript.

      Title: ${title}
      Transcript: ${context}

      If the transcript does not contain at least 3 specific ingredients (actual food items like chicken, rice, garlic) and measurements, reply with exactly one word: SKIP

      If it does contain recipe details, reply in this format. also list out all the ingredients and measurements:
      Summary: ...
      Calories: ...
      Protein: ...
      Carbs: ...
      Fat: ...

      If macronutrients are not specified, estimate using common ingredients. 

      Do not apologize. Do not ask for more information. If in doubt, reply SKIP.`

    }]
  });

  const text = message.content[0].text.trim();
  if (text.startsWith('SKIP')) {
    return res.json({ skip: true });
  }
  res.json({ analysis: text });});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
