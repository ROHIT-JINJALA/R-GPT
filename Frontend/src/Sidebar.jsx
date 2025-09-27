import blacklogo from "./assets/logo.png";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import { v4 as uuidv4 } from "uuid";

const backendUrl = import.meta.env.VITE_SERVER_URI;

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false); // close sidebar on mobile
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);

    try {
      const response = await fetch(`${backendUrl}/api/thread/${newThreadId}`);
      const res = await response.json();
      SetPrevChats(res);
      setNewChat(false);
      setReply(null);
      setIsOpen(false); // close sidebar on mobile
    } catch (error) {
      console.error("Failed to fetch thread data:", error);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(`${backendUrl}/api/thread/${threadId}`, {
        method: "DELETE",
      });
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
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-2xl bg-gray-800 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Sidebar */}
      <section
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 md:w-72 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 md:relative md:translate-x-0 flex flex-col p-4`}
      >
        {/* New chat button */}
        <button
          onClick={creatNewChat}
          className="flex items-center gap-2 p-2 md:pb-5 ml-13  md:ml-1 bg-gray-800 hover:bg-gray-700 border-b-1 rounded"
        >
          <img src={blacklogo} alt="gpt logo" className="w-8 h-8 mt-0.5" />
          <i className="fa-solid fa-pen-to-square"></i>
          <span className="sm:inline">New Chat</span>
        </button>

        {/* History */}
        <ul className="history flex-1 overflow-y-auto mt-3 space-y-2 scrollbar-hide">
          {allThreads?.map((thread, idx) => (
            <li
              key={idx}
              onClick={() => changeThread(thread.threadId)}
              className={`flex justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-700 ${
                thread.threadId === currThreadId ? "bg-gray-700" : ""
              }`}
            >
              <span className="truncate ">
                {thread.title}
              </span>
              <i
                className="fa-regular fa-trash-can ml-2 text-gray-400 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.threadId);
                }}
              ></i>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className=" mt-4">
          <div className="text-center text-gray-400 text-shadow-md border-t-1 flex items-center justify-center">
            <p className="mt-5">By Rohit &hearts;</p>
          </div>
        </div>
      </section>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
