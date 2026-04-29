import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('');

  function fetchMessage(){
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }
  return (
    <div>
      <button onClick={fetchMessage}>Call the backend</button>
      <p>{message}</p>
    </div>
  )
}

export default App
