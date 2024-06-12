import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.jpg";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/Apiroutes';

function Login() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: "",
        password : "",
    });

    const toastOptions ={
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    // useEffect(() => {
    //     if(localStorage.getItem('chat-user')){
    //         navigate("/chat");
    //     }
    // },[]);

    useEffect(() => {
        // Check if the user is already authenticated
        if(localStorage.getItem('chat-user')){
            navigate("/chat");
        } else {
            // If not authenticated, remove any existing "chat-user" item
            localStorage.removeItem('chat-user');
        }
    },[]);
    
    

    const handleChange = (event) => {
        setValues({...values,[event.target.name]:event.target.value});
    };


    // const handleSubmit = async (event) =>{
    //     event.preventDefault();
    //     if(handleValidation()) {
    //         console.log("in validation" , loginRoute);
    //         const {password, username } = values;
    //         const {data} = await axios.post(loginRoute,{
    //             username , 
    //             password,
    //         });
    //         if (data.status === false) {
    //             toast.error(data.msg, toastOptions);
    //         }
    //         if (data.status === true){
    //             localStorage.setItem("mernchat-test-user" , JSON.stringify(data.user));
    //             navigate("/");
    //         } 
    //     }
    // };


    // validations

    const handleValidation = () => {
       const { password, username } = values; 
       if(password === ""){
        toast.error("Email and Password is required",toastOptions);
        return false;        
       } else if (username.length === ""){
        toast.error("Email and Password is required" , toastOptions);
        return false;
       } 
       return true;
    };


    // submit
    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(handleValidation()) {
            console.log("in validation" , loginRoute);
            const {password, username } = values;
            const {data} = await axios.post(loginRoute,{
                username , 
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true){
                localStorage.setItem("mernchat-test-user" , JSON.stringify(data.user));
                navigate("/chat");
            } 
        }
    };


  return (
    <>
    <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="brand">
                <img src={Logo} alt="logo" />
                <h1>TalkMates</h1>
            </div>
            
            <input 
                type = "text" 
                placeholder="Username" 
                name="username" 
                onChange={(e) => handleChange(e)}
                min = "3" 
            />
            
            <input 
                type = "password" 
                placeholder="Password" 
                name="password" 
                onChange={(e) => handleChange(e)} 
            />

            <button type="submit">Login</button>
            
            <span>
               Don't have an account? <Link to="/Register">Register</Link>
            </span>
        </form>
    </FormContainer>
    <ToastContainer/>
    </>
  );
}

// styling...
const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display : flex;
flex-direction : column;
justify-content: center;
gap: 0.5rem;
align-items: center;
background-color: #131324;

// brand...

.brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content : center;

    img{
        height: 2rem;
    }

    h1{
        color: white;
        text-transform : uppercase;
    }
}

// form...

form { 
    display : flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 3rem;

    input{
        background-color : transparent;
        padding: 0.5rem;
        border : 0.1rem solid #FFA500;
        border-radius: 0.4rem;
        color: white;
        width : 100%;
        font-size: 1rem;

        &:focus { 
            border: 0.1rem solid #997af0;
            outline:none;
        }
    }

    button {
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
    span { 
        color : white;
        text-transform : uppercase;

        a{
            color : #fa8128;
            text-transform : none;
            text-decoration : none;
            font-weight : bold;
        }
    }

    img { 
        border-radius : 2px;
        height : 100px;
        margin-left : 20px;

    }
}
`;
 

export default Login;
