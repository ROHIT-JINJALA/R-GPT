import "./ChatWindow.css";
import Chat from "./Chat";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import { ScaleLoader } from "react-spinners";

const backendUrl = import.meta.env.VITE_SERVER_URI;

export default function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    SetPrevChats,
    setNewChat,
  } = useContext(MyContext);
  const [loding, setLoding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    setLoding(true);
    setNewChat(false);
    // console.log("message: ", prompt, "thread id: ", currThreadId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: prompt,
        threadId: currThreadId,
      }),
    };
    try {
      // console.log(currThreadId);
      const response = await fetch(`${backendUrl}/api/chat`, options);
      const res = await response.json();
      // console.log(res);
      setReply(res.reply);
    } catch (error) {
      console.log(error);
    }
    setLoding(false);
  };
  //append new chat into prev chat
  useEffect(() => {
    if (prompt && reply) {
      SetPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }
    setPrompt("");
  }, [reply]);

  const handelProfileClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          R GPT <i className="fa-solid fa-chevron-down"></i>
        </span>
        <button>
          {" "}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-sm"
          >
            <path d="M17.665 10C17.665 10.6877 17.1785 11.2454 16.5488 11.3945L16.4219 11.4189C14.7098 11.6665 13.6129 12.1305 12.877 12.8623C12.1414 13.5938 11.6742 14.6843 11.4238 16.3887C11.3197 17.0973 10.7182 17.665 9.96484 17.665C9.27085 17.665 8.68836 17.1772 8.53613 16.5215C8.12392 14.7459 7.6623 13.619 6.95703 12.8652C6.31314 12.1772 5.39414 11.7268 3.88672 11.4688L3.57715 11.4199C2.88869 11.319 2.33496 10.734 2.33496 10C2.33496 9.26603 2.88869 8.681 3.57715 8.58008L3.88672 8.53125C5.39414 8.27321 6.31314 7.82277 6.95703 7.13477C7.6623 6.38104 8.12392 5.25413 8.53613 3.47852L8.56934 3.35742C8.76133 2.76356 9.31424 2.33496 9.96484 2.33496C10.7182 2.33497 11.3197 2.9027 11.4238 3.61133L11.5283 4.22266C11.7954 5.58295 12.2334 6.49773 12.877 7.1377C13.6129 7.86952 14.7098 8.33351 16.4219 8.58105C17.1119 8.68101 17.665 9.26667 17.665 10Z"></path>
          </svg>{" "}
          &nbsp;Upgrade your plan
        </button>

        <div className="userIconDiv" onClick={handelProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i> Settings
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
          </div>
        </div>
      )}
      <Chat></Chat>

      <ScaleLoader color="#fff" loading={loding}></ScaleLoader>

      <div className="chatInput">
        <div className="inputBox">
          <input
            type="text"
            name=""
            id=""
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key == "Enter" ? getReply() : "")}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-arrow-up"></i>
          </div>
        </div>
        <p className="info">
          R-GPT can make mistakes. Check important info. See Cookie Preferences.
        </p>
      </div>
    </div>
  );
}
