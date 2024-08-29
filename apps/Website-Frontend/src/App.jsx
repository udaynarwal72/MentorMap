import { useEffect, useState } from 'react'
// import './App.css'
import NavBar from './components/NavBar/NavBar'
import io from "socket.io-client";
const ENDPOINT = 'http://localhost:3000';
var socket, selectedChatCompare;

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [])

  return (
    <>
      <NavBar />
      <div>
      </div>
    </>
  )
}

export default App
