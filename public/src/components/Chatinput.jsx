import React, { useState, useRef } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { RiFileUploadFill } from "react-icons/ri";

export default function ChatInput({ handleSendMsg, handleSendFile }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);

  const inputRef = useRef(null);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0 || file !== null) {
      if (msg.length > 0) {
        handleSendMsg(msg);
        setMsg("");
      }
      if (file !== null) {
        handleSendFile(file);
        setFile(null);
      }
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <Picker onEmojiClick={handleEmojiClick} inputRef={inputRef} />
          )}
        </div>
        <label htmlFor="fileInput">
          <FileUploadIcon />
        </label>
        <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: "none" }} />
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow : 0 5px 10px #000;
        border-radius: 10px;
        border-color : #9186f3;

        .emoji-scroll-wrapper :: -webkit-scrollbar{
          background-color: #080420;
          width : 5px;
          &-thumb{
            background-color: #9186f3;
          }
        }
        .emoji-categories {
          button{
            filter : contrast(0);
          }
        }
        .emoji-search{
          background-color: transparent;
          border-color : #9186f3;
        }

        .emoji-group:before{
          background-color : #080420;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #fff7e6;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #f3d186;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fa8128;
      border: none;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

const FileUploadIcon = styled(RiFileUploadFill)`
  font-size: 20px;
  color: #888;
  cursor: pointer;
`;
