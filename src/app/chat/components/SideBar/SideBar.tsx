import React from "react";
import { useRouter } from "next/navigation";
import { useChatContext } from "@/context/chatContext/useChatContext";
import { useChat } from "ai/react";

interface TopicsType {
  chatId: string;
  topic: string;
}
const SideBar = ({ topics }: { topics: TopicsType[] }) => {
  const { setChatId, chatId } = useChatContext();
  const { setMessages } = useChat();

  const router = useRouter();

  return (
    <div>
      <div className={"fixed top-0 w-[260px]"}>
        <div className="flex items-center justify-end">
          <div className="bg-blue-500 flex justify-center items-center rounded-b-lg hover:bg-blue-600 cursor-pointer">
            <div
              className="w-[260px]   px-6 py-4  text-center font-bold "
              onClick={() => {
                setChatId("");
              }}
            >
              {" "}
              New Chat{" "}
            </div>
          </div>
        </div>
      </div>
      <div className={"relative top-16 h-[calc(100vh-130px)] overflow-y-auto"}>
        {topics && topics.length ? (
          <>
            {topics.map((topic, i) => (
              <div
                key={`Topic-${topic}-i`}
                onClick={() => {
                  setChatId(topic.chatId);
                }}
                className={` mb-2 p-4 font-medium  bg-gray-300 hover:bg-gray-200 
                         text-black 
                         ${chatId === topic.chatId ? "bg-green-200" : "none"}
                         ${chatId === topic.chatId ? "pointer-events-none" : "cursor-pointer"}
           w-[260px] overflow-hidden  overflow-ellipsis whitespace-nowrap
                         `}
              >
                {" "}
                {topic.topic}{" "}
              </div>
            ))}
          </>
        ) : null}
      </div>

      <div className={"fixed bottom-0  w-[260px]"}>
        <div className="flex items-center justify-end">
          <div className="bg-gray-300 text-black flex justify-center items-center rounded-t-lg hover:bg-gray-400 cursor-pointer">
            <a
              className="w-[260px]   px-6 py-4  text-center font-bold "
              href={"/api/auth/logout"}
            >
              {" "}
              Logout{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SideBar);
