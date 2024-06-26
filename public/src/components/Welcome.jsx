import React from 'react';
import styled from "styled-components";
import Robot from "../assets/robot1.gif"

export default function welcome({ currentUser }) {
  return <Container>
    <img src ={Robot} alt= "Robot "/>
    
    <h1>
        Welcome, <span>{currentUser.username}!</span>
    </h1>

    <h3>Get Yor TalkMates </h3>
  </Container>;
}


const Container = styled.div `

display : flex;
justify-content : center;
align-items : center;
flex-direction : column;
color : white;

img{
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
}
span {
    color: orange;
  }

`;