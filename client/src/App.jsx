import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([]);
  const [ingredients, setIngredients] = useState('');  //  saves ingredients for reference when user searches

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
    </div>
  ))}
</div>
  )
}

export default App
