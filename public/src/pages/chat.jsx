// import React, { useState, useEffect , useRef } from 'react';
// import styled from "styled-components";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import Contacts from "../components/Contacts";
// import { allUsersRoute } from "../utils/Apiroutes"; // Adjust import path and variable name
// import Welcome from '../components/Welcome';
// import ChatContainer from '../components/ChatContainer.jsx';
// import {io} from "socket.io-client";


// function Chat() {
//   const socket = useRef();
//   const navigate = useNavigate();
//   const [contacts, setContacts] = useState([]);
//   const [currentUser, setCurrentUser] = useState(undefined);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentChat, setCurrentChat] = useState(undefined);
//   const [isLoaded, setIsLoaded] = useState(false); // Adding isLoaded state

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userFromStorage = localStorage.getItem("chat-user");
//         if (!userFromStorage) {
//           navigate("/login"); // Navigate to the login page
//           return;
//         } else {
//           setCurrentUser(
//             await JSON.parse(
//               localStorage.getItem("chat-user")
//             )
//           );
//         }
//         const user = JSON.parse(userFromStorage);
//         setCurrentUser(user);

//         if (!user.isAvatarImageSet) {
//           navigate("/setAvatar");
//           return;
//         }

//         const response = await axios.get(`${allUsersRoute}/${user._id}`);
//         setContacts(response.data);
//         setLoading(false);
//         setIsLoaded(true); // Setting isLoaded to true after loading
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//         setIsLoaded(true); // Setting isLoaded to true even in case of error
//       }
//     };

//     fetchData();

//     if (currentUser) {
//       socket.current = io(host);
//       socket.current.emit("add-user" , currentUser._id);
//     }

//     return () =>{
//       if(socket.current){
//         socket.current.disconnect();
//       }
//     };
//   }, []);

//   const handleChatChange = (chat) => {
//     setCurrentChat(chat);
//   }
//   if (!isLoaded) { // Checking if the component is still loading
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <Container>
//       <div className="container">
//         <Contacts 
//         contacts={contacts} 
//         currentUser={currentUser} 
//         changeChat ={handleChatChange} />
        
//         {
//         isLoaded && currentChat === undefined ? (
//         <Welcome currentUser={currentUser} />
//           ) : (
//             <ChatContainer currentChat={currentChat} currentUser = {currentUser} />
//           )}

//       </div>
//     </Container>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Contacts from "../components/Contacts";
import { allUsersRoute, host} from "../utils/Apiroutes";
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer.jsx';
import { io } from "socket.io-client"; // Import io from socket.io-client

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFromStorage = localStorage.getItem("chat-user");
        if (!userFromStorage) {
          navigate("/login");
          return;
        } else {
          setCurrentUser(
            await JSON.parse(localStorage.getItem("chat-user"))
          );
        }
        const user = JSON.parse(userFromStorage);
        setCurrentUser(user);

        if (!user.isAvatarImageSet) {
          navigate("/setAvatar");
          return;
        }

        const response = await axios.get(`${allUsersRoute}/${user._id}`);
        setContacts(response.data);
        setLoading(false);
        setIsLoaded(true);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        setIsLoaded(true);
      }
    };

    fetchData();

    // Establish WebSocket connection
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }

    // Clean up function
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser, navigate]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer 
          currentChat={currentChat} 
          currentUser={currentUser} 
          socket = {socket} 
          />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
}

`;

export default Chat;
