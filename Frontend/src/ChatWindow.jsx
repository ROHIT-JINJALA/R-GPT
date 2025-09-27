import Chat from "./Chat";
import { useContext, useState, useEffect, useRef } from "react";
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

  const [loading, setLoading] = useState(false);

  // Ref for auto scroll
  const chatEndRef = useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getReply = async () => {
    if (!prompt.trim()) return;

    // show loader and scroll immediately
    setLoading(true);
    setNewChat(false);
    scrollToBottom();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: prompt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch(`${backendUrl}/api/chat`, options);
      const res = await response.json();
      setReply(res.reply);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  // save conversation history
  useEffect(() => {
    if (prompt && reply) {
      SetPrevChats((prevChats) => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
    }
    setPrompt("");
  }, [reply]);

  // dropdown (user profile menu)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // auto scroll on reply, loader, or thread change
  useEffect(() => {
    scrollToBottom();
  }, [reply, currThreadId, loading]);

  return (
    <div className="flex items-center justify-center flex-col h-screen w-full text-white bg-[#161B22]">
      {/* Header */}
      <header className="flex justify-between w-full h-20 items-center px-4 py-3 border-b border-gray-700 bg-gray-900">
        <span className="font-semibold text-lg ml-15 md:ml-0">R-GPT</span>
        <button className="hidden sm:flex items-center gap-1 bg-[#40414f] hover:bg-[#565869] px-3 py-1 rounded-md text-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-sm"
          >
            <path d="M17.665 10C17.665 10.6877 17.1785 11.2454 16.5488 11.3945L16.4219 11.4189C14.7098 11.6665 13.6129 12.1305 12.877 12.8623C12.1414 13.5938 11.6742 14.6843 11.4238 16.3887C11.3197 17.0973 10.7182 17.665 9.96484 17.665C9.27085 17.665 8.68836 17.1772 8.53613 16.5215C8.12392 14.7459 7.6623 13.619 6.95703 12.8652C6.31314 12.1772 5.39414 11.7268 3.88672 11.4688L3.57715 11.4199C2.88869 11.319 2.33496 10.734 2.33496 10C2.33496 9.26603 2.88869 8.681 3.57715 8.58008L3.88672 8.53125C5.39414 8.27321 6.31314 7.82277 6.95703 7.13477C7.6623 6.38104 8.12392 5.25413 8.53613 3.47852L8.56934 3.35742C8.76133 2.76356 9.31424 2.33496 9.96484 2.33496C10.7182 2.33497 11.3197 2.9027 11.4238 3.61133L11.5283 4.22266C11.7954 5.58295 12.2334 6.49773 12.877 7.1377C13.6129 7.86952 14.7098 8.33351 16.4219 8.58105C17.1119 8.68101 17.665 9.26667 17.665 10Z"></path>
          </svg>
          Upgrade
        </button>
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <div
            className="cursor-pointer bg-gray-400 border border-gray-200 rounded-full shadow-lg z-50 overflow-hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-user text-lg"></i>
          </div>

          {isOpen && (
            <div className="absolute mt-50 right-5 w-48 bg-[#202123] rounded-md shadow-lg z-50 border border-gray-700 overflow-hidden">
              <div className="px-4 py-3 hover:bg-[#40414f] cursor-pointer flex items-center gap-2">
                <i className="fa-solid fa-gear"></i> Settings
              </div>
              <div className="px-4 py-3 hover:bg-[#40414f] cursor-pointer flex items-center gap-2">
                <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade
              </div>
              <div className="px-4 py-3 hover:bg-[#40414f] cursor-pointer flex items-center gap-2">
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-10 py-4 space-y-4 scrollbar-hide justify-center items-center">
        <Chat />
        {loading && (
          <div className="flex justify-center py-4">
            <ScaleLoader color="#10a37f" loading={loading} />
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Input area */}
      <footer className="px-4 sm:px-10 py-3 border-t border-gray-700 w-full md:w-6xl">
        <div className="flex flex-col items-center w-full">
          <div className="inputBox relative w-10/12 flex items-center">
            <input
              type="text"
              placeholder="Ask anything..."
              className="w-full bg-gray-700 text-white text-sm sm:text-base rounded-xl px-4 py-4 focus:outline-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && prompt.trim()) getReply();
              }}
            />
            <button
              id="submit"
              onClick={() => prompt.trim() && getReply()}
              className={`absolute right-3 p-2 rounded-full text-white ${
                prompt.trim()
                  ? "bg-[#10a37f] hover:bg-[#409580]"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
              disabled={!prompt.trim()}
            >
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-2 text-center">
            R-GPT can make mistakes. Check important info.
          </p>
        </div>
      </footer>
    </div>
  );
}
