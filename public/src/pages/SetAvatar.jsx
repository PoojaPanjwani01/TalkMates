// import React, {useState, useEffect} from 'react';
// import styled from "styled-components";
// import { useNavigate } from 'react-router-dom';
// import loader from "../assets/loader.gif";
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { SetAvatarRoute } from '../utils/Apiroutes';
// import {Buffer} from 'buffer';
// export default function SetAvatar(){

//     const api = 'https://api.multiavatar.com/456789';
//     const navigate = useNavigate();
//     const [avatars , SetAvatars] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    
//     const toastOptions ={
//         position: "bottom-right",
//         autoClose: 5000,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//     };

//     useEffect(async () => {
//         if (!localStorage.getItem("chat-user")){
//             navigate("/login");
//         }
//     }, []);

//     const setProfilePicture = async () => {
//         if(selectedAvatar===undefined){
//             toast.error("Please Select an avatar" ,toastOptions);
//         } else{
//             const user = await JSON.parse(localStorage.getItem("chat-user"));
//             const {data} = await axios.post(`${SetAvatarRoute}/${user._id}`, {
//                 image  : avatars[selectedAvatar],
//             });

//             if(data.isSet){
//                 user.isAvatarImageSet = true;
//                 user.avatarImage = data.image;
//                 localStorage.setItem("chat-user", JSON.stringify(user));
//                 navigate('/chat'); 
//             } else {
//                 toast.error("error in setting avatar , please try again!!" , toastOptions);
//             }
//         }
//     };

//     useEffect(async () => {
//         const data = [];
//         for (let i=0 ; i < 4; i++){
//             const image = await axios.get (
//                 `${api}/${Math.round(Math.random()*1000)}`
//             );

//             const buffer = new Buffer(image.data);
//             data.push(buffer.toString("base64"));
//         }

//         SetAvatar(data);
//         setIsLoading(false);
//     }, []);

//     return (
//     <>
//     {
//         isLoading ? <container>
//             <img src={loader} alt="loader" className="loader"/>
//         </container> : (
//         <Container>
//             <div className = "title-container">
//                 <h1>Pick an Avatar for your Profile Picture</h1>
//             </div>

//             <div className = "avatars">
//                 {
//                     avatars.map((avatar, index) =>{
//                         return (
//                         <div 
//                             key = {index}
//                             className = {`avatar ${selectedAvatar ==index ?"selected" : ""
//                         }`}>                            
                        
//                         <img 
//                         src = {`data : image/svg+xml;base64,${avatar}`} 
//                         alt = "avatar" 
//                         onClick = {() => setSelectedAvatar(index)}/>
//                         </div>
//                         )
//                     })}
//             </div>
//             <button className = "submit-btn" onClick = {setProfilePicture}>Set as Profile Picture</button>
            
            
//         </Container>
//         )
//     }
//         <ToastContainer />
//     </>
//     );
// }

// const Container = styled.div`
// display : flex;
// justify-content : center;
// align-items : center;
// flex-direction : column;
// gap : 3rem;
// background-color : #131324;
// height : 100vh ;
// width : 100vw;

// .loader {
//     max-inline-size : 100%;
// }

// .title-container {
//     h1{
//         color : white;
//     }
// }

// .avatars{
//     display : flex;
//     gap : 2rem;
    
//     .avatar{
//         border : 0.4rem solid transparent;
//         padding : 0.4rem;
//         border-radius : 5rem;
//         display : flex;
//         justify-content : center;
//         align-items : center;
//         transition : 0.5s ease-in-out;

//         img {
//             height : 6rem;
//         }
//     }

//     .selected {
//         border : 0.4rem solid #FA8128; 
//     }
// }

// .submit-btn {
//     background-color : #fc6a03;
//     color : white ;
//     padding : 0.5rem 0.5rem;
//     border: none;
//     font-weight : bold;
//     cursor: pointer;
//     border-radius : 0.4rem;
//     font-size: 1rem;
//     text-transform : uppercase;
//     transition : 0.5s ease-in-out;

//     &:hover {
//         background-color : #fa8128; 
//     }
// }

// `;




// import React, { useState, useEffect } from 'react';
// import styled from "styled-components";
// import { useNavigate } from 'react-router-dom';
// import loader from "../assets/loader.gif";
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { SetAvatarRoute } from '../utils/Apiroutes';
// import { Buffer } from 'buffer';

// export default function SetAvatar() {

//     const api = 'https://api.multiavatar.com/456789';
//     const navigate = useNavigate(); // Moved useNavigate here
//     const [avatars, SetAvatars] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [selectedAvatar, setSelectedAvatar] = useState(undefined);

//     const toastOptions = {
//         position: "bottom-right",
//         autoClose: 5000,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//     };

//     useEffect(() => { // Removed async from this useEffect
//         if (!localStorage.getItem("chat-user")) {
//             navigate("/login");
//         }
//     }, [navigate]); // Added navigate as dependency

//     const setProfilePicture = async () => {
//         if (selectedAvatar === undefined) {
//             toast.error("Please Select an avatar", toastOptions);
//         } else {
//             const user = await JSON.parse(localStorage.getItem("chat-user"));
//             const { data } = await axios.post(`${SetAvatarRoute}/${user._id}`, {
//                 image: avatars[selectedAvatar],
//             });

//             if (data.isSet) {
//                 user.isAvatarImageSet = true;
//                 user.avatarImage = data.image;
//                 localStorage.setItem("chat-user", JSON.stringify(user));
//                 navigate('/chat');
//             } else {
//                 toast.error("error in setting avatar , please try again!!", toastOptions);
//             }
//         }
//     };

//     useEffect(() => { 
//         const fetchData = async () => {
//             const data = [];
//             for (let i = 0; i < 4; i++) {
//                 const image = await axios.get(
//                     `${api}/${Math.round(Math.random() * 1000)}`
//                 );

//                 const buffer = new Buffer(image.data);
//                 data.push(buffer.toString("base64"));
//             }

//             SetAvatars(data);
//             setIsLoading(false);
//         };

//         fetchData();
//     }, []);

//     return (
//         <>
//             {
//                 isLoading ? <Container>
//                     <img src={loader} alt="loader" className="loader" />
//                 </Container> : (
//                         <Container>
//                             <div className="title-container">
//                                 <h1>Pick an Avatar for your Profile Picture</h1>
//                             </div>

//                             <div className="avatars">
//                                 {
//                                     avatars.map((avatar, index) => {
//                                         return (
//                                             <div
//                                                 key={index}
//                                                 className={`avatar ${selectedAvatar === index ? "selected" : ""
//                                                     }`}>

//                                                 <img
//                                                     src={`data : image/svg+xml;base64,${avatar}`}
//                                                     alt="avatar"
//                                                     onClick={() => setSelectedAvatar(index)} />
//                                             </div>
//                                         )
//                                     })}
//                             </div>
//                             <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>


//                         </Container>
//                     )
//             }
//             <ToastContainer />
//         </>
//     );
// }

// const Container = styled.div`
// display : flex;
// justify-content : center;
// align-items : center;
// flex-direction : column;
// gap : 3rem;
// background-color : #131324;
// height : 100vh ;
// width : 100vw;

// .loader {
//     max-inline-size : 100%;
// }

// .title-container {
//     h1{
//         color : white;
//     }
// }

// .avatars{
//     display : flex;
//     gap : 2rem;
    
//     .avatar{
//         border : 0.4rem solid transparent;
//         padding : 0.4rem;
//         border-radius : 5rem;
//         display : flex;
//         justify-content : center;
//         align-items : center;
//         transition : 0.5s ease-in-out;

//         img {
//             height : 6rem;
//         }
//     }

//     .selected {
//         border : 0.4rem solid #FA8128; 
//     }
// }

// .submit-btn {
//     background-color : #fc6a03;
//     color : white ;
//     padding : 0.5rem 0.5rem;
//     border: none;
//     font-weight : bold;
//     cursor: pointer;
//     border-radius : 0.4rem;
//     font-size: 1rem;
//     text-transform : uppercase;
//     transition : 0.5s ease-in-out;

//     &:hover {
//         background-color : #fa8128; 
//     }
// }

// `;



import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SetAvatarRoute } from '../utils/Apiroutes';
import { Buffer } from 'buffer';

export default function SetAvatar() {

    const api = 'https://api.multiavatar.com/456789';
    const navigate = useNavigate(); 
    const [avatars, SetAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => { 
        if (!localStorage.getItem("chat-user")) {
            navigate("/login");
        }
    }, []); 

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please Select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-user"));
            const { data } = await axios.post(`${SetAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-user", JSON.stringify(user));
                navigate('/chat');
            } else {
                toast.error("error in setting avatar , please try again!!", toastOptions);
            }
        }
    };

    useEffect(() => { 
        const fetchData = async (retryCount = 0) => {
            try {
                const data = [];
                for (let i = 0; i < 4; i++) {
                    const response = await axios.get(
                        `${api}/${Math.round(Math.random() * 1000)}`
                    );
                    const imageData = response.data;

                    // Convert image data to base64
                    const buffer = new Buffer(imageData);
                    data.push(buffer.toString("base64"));
                }

                // Set avatars and loading state
                SetAvatars(data);
                setIsLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 429 && retryCount < 3) {
                    // If rate limited, retry after waiting for some time (e.g., exponential backoff)
                    await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
                    fetchData(retryCount + 1); // Retry with incremented retryCount
                } else {
                    console.error("Error fetching avatar images:", error);
                    // Handle other errors (e.g., show error message)
                    toast.error("Error fetching avatar images. Please try again later.", toastOptions);
                    setIsLoading(false); // Ensure loading state is set to false
                }
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {
                isLoading ? <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container> : (
                        <Container>
                            <div className="title-container">
                                <h1>Pick an Avatar for your Profile Picture</h1>
                            </div>

                            <div className="avatars">
                                {
                                    avatars.map((avatar, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                                                onClick={() =>setSelectedAvatar(index)}>

                                                <img
                                                    src={`data:image/svg+xml;base64,${avatar}`}
                                                    alt="avatar"
                                                    />
                                            </div>
                                        );
                                    })}
                            </div>
                            <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
                        </Container>
                    )
            }
            <ToastContainer />
        </>
    );
}

const Container = styled.div`
display : flex;
justify-content : center;
align-items : center;
flex-direction : column;
gap : 3rem;
background-color : #131324;
height : 100vh ;
width : 100vw;

.loader {
    max-inline-size : 100%;
}

.title-container {
    h1{
        color : white;
    }
}

.avatars{
    display : flex;
    gap : 2rem;
    
    .avatar{
        border : 0.4rem solid transparent;
        padding : 0.4rem;
        border-radius : 5rem;
        display : flex;
        justify-content : center;
        align-items : center;
        transition : 0.5s ease-in-out;

        img {
            height : 6rem;
        }
    }

    .selected {
        border : 0.4rem solid #FA8128; 
    }
}

.submit-btn {
    background-color : #fc6a03;
    color : white ;
    padding : 0.5rem 0.5rem;
    border: none;
    font-weight : bold;
    cursor: pointer;
    border-radius : 0.4rem;
    font-size: 1rem;
    text-transform : uppercase;
    transition : 0.5s ease-in-out;

    &:hover {
        background-color : #fa8128; 
    }
}
`;
