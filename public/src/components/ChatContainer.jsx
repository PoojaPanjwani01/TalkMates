// import React,{useState,useEffect} from 'react';
// import styled from 'styled-components';
// import Logout from './Logout';
// import Chatinput from './Chatinput';
// import Messages from './Messages';
// import axios from 'axios';
// import { getAllMessagesRoute, sendMessageRoute } from '../utils/Apiroutes';

// export default function ChatContainer({ currentChat, currentUser }) {

//   const [messages, setMessages] = useState([]);

//   useEffect(async() => {
//     const response = await axios.post(getAllMessagesRoute,{
//       from: currentUser._id,
//       to: currentChat._id,
//     });
//     setMessages(response.data);
//   }, [currentChat]);

//   const handleSendMsg = async (msg) => {
//     try {
//       await axios.post(sendMessageRoute, {
//         from: currentUser._id,
//         to: currentChat._id,
//         message: msg,
//       });
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <Container>
//       <div className="chat-header">
//         <div className="user-details">
//           <div className="avatar">
//             <img
//               src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
//               alt="avatar"
//             />
//           </div>
//           <div className="username">
//             <h3>{currentChat.username}</h3>
//           </div>
//         </div>
//         <Logout />
//         </div>
//       <div className="chat-messages">
//         {messages.map((message) => {
//           return (
//             <div>
//               <div
//                 className={`message ${
//                   message.fromSelf ? "sended" : "recieved"
//                 }`}>
//                 <div className="content ">
//                   <p>{message.message}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <Chatinput handleSendMsg={handleSendMsg} />
//     </Container>
//   );
// }

// const Container = styled.div`
//   padding-top: 1rem;

//   .chat-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0 2rem;

//     .user-details {
//       display: flex;
//       align-items: center;
//       gap: 1rem;

//       .avatar img {
//         height: 3rem;
//       }

//       .username h3 {
//         color: white;
//       }
//     }
//   }
// `;


// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import Logout from './Logout';
// import Chatinput from './Chatinput';
// import axios from 'axios';
// import { getAllMessagesRoute, sendMessageRoute } from '../utils/Apiroutes';

// export default function ChatContainer({ currentChat, currentUser, socket }) {
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);
//   scrollRef = useRef();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(getAllMessagesRoute, {
//           from: currentUser._id,
//           to: currentChat._id,
//         });
//         setMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchData();

//     return () => {
//       // Cleanup function if needed
//     };
//   }, [currentChat, currentUser]);

//   const handleSendMsg = async (msg) => {
//     try {
//       await axios.post(sendMessageRoute, {
//         from: currentUser._id,
//         to: currentChat._id,
//         message: msg,
//       });

//       socket.emit('send-message', {
//         from: currentUser._id,
//         to: currentChat._id,
//         message: msg,
//       });

//       const msgs = [...messages];
//       msg.push({fromself: true, message: msg});
//       setMessages(msgs);
//     };

//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   useEffect(() =>{
//     if(socket,current){
//       socket.current.on("msg-receive" , (msg) => {
//         setArrivalMessage({fromSelf : false , message: msg});
//       });
//     }
//   }, []);

//   useEffect(() => {
//     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage]);

//   useEffect(() =>{
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <Container>
//       <div className="chat-header">
//         <div className="user-details">
//           <div className="avatar">
//             <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
//           </div>
//           <div className="username">
//             <h3>{currentChat.username}</h3>
//           </div>
//         </div>
//         <Logout />
//       </div>
//       <div className="chat-messages">
//         {messages.map((message, index) => (
//           <div key={index}>
//             <div className={`message ${message.fromSelf ? 'sended' : 'received'}`}>
//               <div className="content">
//                 <p>{message.message}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Chatinput handleSendMsg={handleSendMsg} />
//     </Container>
//   );
// }

// const Container = styled.div`
//   padding-top: 1rem;
//   display :grid;
//   grid-template-rows  : 10% 78% 12%;
//   gap : 0.1rem;
//   overflow : hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px){
//     grid-template-rows: 15% 70% 15%;
//   }
//     .chat-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0 2rem;

//     .user-details {
//       display: flex;
//       align-items: center;
//       gap: 1rem;

//       .avatar img {
//         height: 3rem;
//       }

//       .username h3 {
//         color: white;
//       }
//     }
//   }
//   .chat-messages{
//     padding : 1rem 2rem;
//     display : flex;
//     flex-direction:column;
//     gap: 1rem;
//     overflow: auto;
//     .message{
//       display : flex;
//       align-items : center;
//       .content {
//         max-width : 40%;
//         overflow-wrap : break-word;
//         padding : 1rem;
//         font-size : 1.1rem;
//         border-radius : 1rem;
//         color : #d1d1d1;
//       }
//     }
//   }
//   .sended {
//     justify-content: flex-end;
//     .content{
//       background-color : #4f04ff2;
//     }
//   }
//   .recieved {
//     justify-content: flex-start;
//     .content {
//       background-color: #9900ff20;
//     }
//   }
// }
// `;






import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import Chatinput from './Chatinput';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import { getAllMessagesRoute, sendMessageRoute } from '../utils/Apiroutes';

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    try {
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });

      socket.emit('send-message', {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div className={`message ${message.fromSelf ? 'sended' : 'received'}`}>
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <Chatinput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar img {
        height: 3rem;
      }

      .username h3 {
        color: white;
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb {
        background-color : #ffffff39;
        width : 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff2;
    }
  }
  .received {
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
    }
  }
`;
