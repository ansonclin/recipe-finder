import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [analyses, setAnalyses] = useState({});

  function searchRecipes() {
    setResults([]);
    setAnalyses({});
    fetch(`/api/search?ingredients=${ingredients}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }

   function analyzeVideo(videoId, title, description) {
    fetch(`/api/analyze?videoId=${videoId}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`)
      .then(res => res.json())
      .then(data => {
        if (data.skip) {
          setResults(prev => prev.filter(v => v.id.videoId !== videoId));
        } else {
          setAnalyses(prev => ({ ...prev, [videoId]: data.analysis }));
        }
      });
  }


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Recipe Finder</h1>

      <div className="flex gap-4 justify-center mb-10">
        <input
          type="text"
          placeholder="Enter ingredients (e.g. chicken, rice)"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={searchRecipes}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {results.map(video => (
          <div key={video.id.videoId} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="w-full" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{video.snippet.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{video.snippet.description}</p>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                className="text-blue-500 underline text-sm"
              >
                Watch on YouTube
              </a>
              <button
                onClick={() => analyzeVideo(video.id.videoId, video.snippet.title, video.snippet.description)}
                className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Analyze
              </button>
              {analyses[video.id.videoId] && (
                <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-line">
                  {analyses[video.id.videoId]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
