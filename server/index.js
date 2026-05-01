require('dotenv').config()
const axios = require('axios');
const Anthropic = require('@anthropic-ai/sdk');
const anthropic = new Anthropic();
const express = require('express');
const { YoutubeTranscript } = require('youtube-transcript')
const app = express();

app.get('/api/hello', (req,res) => {
    res.json( {message:'Hello from the backend!'});
});

app.get('/api/analyze', async (req, res) => {
  const title = req.query.title;
  const description = req.query.description;
  const videoId = req.query.videoId;

  let context = description;

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const transcriptText = transcript.map(t => t.text).join(' ');
    context = transcriptText.slice(0, 2000);
  } catch (e) {
    context = description;
  }

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    messages: [{
      role: 'user',
      content: `Based on this YouTube recipe video, estimate the macros and give a 1-2 sentence summary. Also provide the ingridients for each recipe.
      Title: ${title}
      Content: ${context}
      
      Reply in this format:
      Summary: ...
      Calories: ...
      Protein: ...
      Carbs: ...
      Fat: ...`
    }]
  });

  res.json({ analysis: message.content[0].text });
});


app.get('/api/analyze', async (req, res) => {
  const title = req.query.title;
  const description = req.query.description;

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    messages: [{
      role: 'user',
      content: `Based on this YouTube recipe video, estimate the macros and give a 1-2 sentence summary.
      Title: ${title}
      Description: ${description}
      
      Reply in this format:
      Summary: ...
      Calories: ...
      Protein: ...
      Carbs: ...
      Fat: ...`
    }]
  });

  res.json({ analysis: message.content[0].text });
});



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});