import React, { useEffect, useState } from "react";
import { useChat } from "ai/react";
import Message from "@/app/chat/components/Message";
import { useUser } from "@auth0/nextjs-auth0/client";
import { v4 as uuidv4 } from "uuid";
import { useChatContext } from "@/context/chatContext/useChatContext";
import Image from "next/image";

const ChatBody = () => {
  const { setChatId, chatId, setSideBarRefresh } = useChatContext();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat();
  const [submitCalled, setSubmitCalled] = useState(false);
  const [getMessagesLoading, setGetMessagesLoading] = useState(false);

  useEffect(() => {
    if (chatId !== "") {
      setGetMessagesLoading(true);
    }
  }, []);

  useEffect(() => {
    if (chatId === "") {
      setMessages([]);

      setSideBarRefresh(false);
    }
  }, [chatId]);

  const { user } = useUser();

  useEffect(() => {
    const getMessages = async () => {
      const result = await fetch(`/api/chat/getMessages`, {
        method: "POST",
        body: JSON.stringify({
          chatId,
          userId: user?.sub,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await result.json();
      if (data.chatMessages.length) {
        setMessages(data.chatMessages);
      }
    };

    if (chatId !== "") {
      getMessages().finally(() => {
        setGetMessagesLoading(false);
      });
    }
  }, [chatId, setMessages, user]);

  useEffect(() => {
    const insertChatId = async (id: string) => {
      const result = await fetch("api/chat/addChatId", {
        method: "POST",
        body: JSON.stringify({
          chatId: id,
          topic: messages[0].content,
          userId: user?.sub,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await result.json();
    };
    if (!chatId && messages.length === 1) {
      const id = uuidv4();
      setChatId(id);
      insertChatId(id).finally(() => {
        setSideBarRefresh(true);
      });
    }
  }, [messages, chatId, user]);

  useEffect(() => {
    const addChat = async () => {
      const assistantMessage = messages[messages.length - 1];
      const userMessage = messages[messages.length - 2];
      const result = await fetch("/api/chat/addChat", {
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              ...userMessage,
              userId: user?.sub,
              chatId: chatId,
            },
            {
              ...assistantMessage,
              userId: user?.sub,
              chatId: chatId,
            },
          ],
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await result.json().finally(() => setSubmitCalled(false));
    };
    if (submitCalled && !isLoading && user) {
      addChat();
    }
  }, [isLoading, chatId, messages, submitCalled, user]);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] pr-4 pt-5">
      {getMessagesLoading ? (
        <div className={"h-screen flex justify-center items-center"}>
          <Image
            src={"/Assets/loader.svg"}
            alt={"loader"}
            width={80}
            height={1}
          />
        </div>
      ) : (
        <div className="h-[90%] overflow-auto">
          <div className="flex flex-col w-full px-4">
            {messages && messages.length
              ? messages?.map((m, i) => (
                  <Message
                    m={m}
                    key={m.id}
                    isLastMessage={messages.length - 1 === i}
                    isLoading={isLoading}
                  />
                ))
              : null}
          </div>
        </div>
      )}
      <footer className="h-[10%]">
        <form
          onSubmit={(e) => {
            setSubmitCalled(true);
            handleSubmit(e);
          }}
        >
          <input
            className="fixed w-[74%]  bottom-0  p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </footer>
    </div>
  );
};

export default ChatBody;
