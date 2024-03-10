import {Routes, Route, Navigate} from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";
import NavBar from "./components/NavBar";
import video1 from "./assets/train.mp4";
import video2 from "./assets/candle.mp4";
import { useContext , useEffect, useState } from "react";
import { Authcontext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const {user} = useContext(Authcontext);
    
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = [video2, video1];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 100);

    return () => clearInterval(intervalId);
  }, [videos]);

  return (
    <ChatContextProvider user={user}>
    
    <NavBar/>
    <Container className="whussup">
    <video autoPlay muted loop id="vig">
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
     <Routes>
        <Route path="/" element = {user ? <Chat /> : <Login />} />
        <Route path="/register" element = {user ? <Chat /> : <Register />}/>
        <Route path="/login" element = {user ? <Chat /> : <Login />}/>
        <Route path="*" element = {<Navigate to="/"/>}/>
     </Routes>
     </Container>
     </ChatContextProvider>
  )
}

export default App;
