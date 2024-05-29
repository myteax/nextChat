"use client";
import React, { useState } from "react";
import ChatContext from "@/context/chatContext/context";

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatId, setChatId] = useState("");
  const [sideBarRefresh, setSideBarRefresh] = useState(true);

  return (
    <ChatContext.Provider
      value={{ chatId, setChatId, sideBarRefresh, setSideBarRefresh }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
