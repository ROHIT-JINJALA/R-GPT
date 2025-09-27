import { MyContext } from "./MyContext";
import { useContext, useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, SetLatestReply] = useState(null);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (reply == null) {
      SetLatestReply(null);
      return;
    }
    if (!prevChats?.length) return;

    const content = reply.split(" ");
    let idx = 0;
    const interval = setInterval(() => {
      SetLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  useEffect(() => {
    scrollToBottom();
  }, [prevChats, latestReply]);

  return (
    <>
      {newChat && (
        <h1 className="text-center text-gray-400 text-2xl flex items-center justify-center mt-50">
          What's in your mind?
        </h1>
      )}
      <div className=" flex flex-col space-y-4 mt-4 px-2 sm:px-0 w-xs md:w-4xl">
        {prevChats?.slice(0, -1).map((chat, idx) => (
          <div
            className={` flex ${
              chat.role === "user" ? "justify-end" : "justify-start"
            }`}
            key={idx}
          >
            <div
              className={`w-auto max-w-full sm:max-w-[80%] p-3 rounded-xl break-words ${
                chat.role === "user"
                  ? "bg-[#10a37f] text-white rounded-br-none"
                  : "bg-gray-800 text-white rounded-bl-none"
              }`}
            >
              {chat.role === "user" ? (
                <p>{chat.content}</p>
              ) : (
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {chat.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}

        {prevChats.length > 0 && (
          <>
            {latestReply === null ? (
              <div className="w-full flex justify-start" key={"non-typing"}>
                <div className="w-auto max-w-full sm:max-w-[80%] p-3 rounded-xl bg-gray-800 text-white rounded-bl-none break-words">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {prevChats[prevChats.length - 1].content}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-start" key={"typing"}>
                <div className="w-auto max-w-full sm:max-w-[80%] p-3 rounded-xl bg-gray-800 text-white rounded-bl-none break-words">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {latestReply}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={chatEndRef} />
      </div>
    </>
  );
}
