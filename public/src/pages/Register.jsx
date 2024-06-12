import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.jpg";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/Apiroutes';

function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: "",
        email : "",
        password : "",
        confirmPassword : "",
    });

    const toastOptions ={
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(handleValidation()) {
            console.log("in validation" , registerRoute);
            const {password, username ,email } = values;
               const {data} = await axios.post(registerRoute,{
                username , 
                email ,
                password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true){
                localStorage.setItem("chat-user" , JSON.stringify(data.user)
                );
                navigate("/chat");
            }
        }
    };


    // validations

    const handleValidation = () => {
       const { password, confirmPassword, username ,email } = values; 
       if(password !== confirmPassword){
        toast.error("Password and Confirmpassword should be same", 
        toastOptions
        );
        return false;        
       } else if (username.length < 3){
        toast.error("Username should be greater than 3 characters" , toastOptions);
        return false;
       } else if (password.length < 8){
        toast.error("Password should be equal or greater than 8 characters" , toastOptions);
       return false;
       }else if (email=== ""){
        toast.error("email is required", toastOptions);
        return false;
       }
       return true;
    };

    const handleChange = (event) => {
        setValues({...values,[event.target.name]:event.target.value});
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
            />

            <input 
                type = "email" 
                placeholder="Email" 
                name="email" 
                onChange={(e) => handleChange(e)} 
            />
            
            <input 
                type = "password" 
                placeholder="Password" 
                name="password" 
                onChange={(e) => handleChange(e)} 
            />
            
            <input 
                type = "password" 
                placeholder="Confirm Password" 
                name="confirmPassword" 
                onChange={(e) => handleChange(e)} 
            />

            <button type="submit">Create User</button>
            
            <span>
                Already have an account? <Link to="/login">Login</Link>
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
 

export default Register;
