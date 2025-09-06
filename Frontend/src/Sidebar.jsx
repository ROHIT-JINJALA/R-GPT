import "./Sidebar.css";
// import blacklogo from "./assets/blacklogo.png";
import blacklogo from "./assets/logo.png";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import { v4 as uuidv4 } from "uuid";

const backendUrl = import.meta.env.VITE_SERVER_URI;


function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    SetPrevChats,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/thread`);
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData);
      //   console.table(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const creatNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv4());
    SetPrevChats([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);

    try {
      const response = await fetch(
        `${backendUrl}/api/thread/${newThreadId}`
      );
      const res = await response.json();
      console.log(res);
      SetPrevChats(res);
      setNewChat(false);
      setReply(null);
    } catch (error) {
      console.error("Failed to fetch thread data:", error);
    }
  };
  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(
        `${backendUrl}/api/thread/${threadId}`,
        { method: "DELETE" }
      );
      const res = await response.json();
      console.log(res);

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );

      if (threadId === currThreadId) {
        creatNewChat();
      }
    } catch (error) {
      console.error("Failed to fetch thread data:", error);
    }
  };

  return (
    <section className="sidebar">
      {/* new chat button  */}
      <button onClick={creatNewChat}>
        <img src={blacklogo} alt="gpt logo" className="logo" />
        <span>
          {" "}
          <i className="fa-solid fa-pen-to-square"></i>{" "}
        </span>
      </button>

      {/* history */}
      <ul className="history">
        {allThreads?.map((thread, idx) => (
          <li
            key={idx}
            onClick={(e) => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted" : ""}
          >
            {thread.title}
            <i
              className="fa-regular fa-trash-can"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}  
            ></i>
          </li>
        ))}
      </ul>

      {/* sing */}
      <div className="sign">
        <div className="signbox">
          <p>By Rohit &hearts;</p>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
