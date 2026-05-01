import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([]);
  const [ingredients, setIngredients] = useState('');  //  saves ingredients for reference when user searches
  const [analyses, setAnalyses] = useState({});


  function fetchMessage(){
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }

  function searchRecipes() {
    fetch(`/api/search?ingredients=${ingredients}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }

  function analyzeVideo(videoId, title, description) {
  fetch(`/api/analyze?videoId=${videoId}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`)
    .then(res => res.json())
    .then(data => setAnalyses(prev => ({ ...prev, [videoId]: data.analysis })));
  }
 

  return (
    <div>
  <h1>Recipe Finder</h1>
  <input
    type="text"
    placeholder="Enter ingredients (e.g. chicken, rice)"
    value={ingredients}
    onChange={e => setIngredients(e.target.value)}
  />
  <button onClick={searchRecipes}>Search</button>

  {results.map(video => (
    <div key={video.id.videoId}>
      <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
      <h3>{video.snippet.title}</h3>
      <p>{video.snippet.description}</p>
      <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank">Watch on YouTube</a>
      <button onClick={() => analyzeVideo(video.id.videoId, video.snippet.title, video.snippet.description)}>Analyze</button>
      <p>{analyses[video.id.videoId]}</p>

    </div>
  ))}
</div>
  )
}

export default App
