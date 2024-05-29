"use client";
import React, { createContext } from "react";

export interface ChatContextType {
  chatId: string;
  setChatId: React.Dispatch<React.SetStateAction<string>>;
  sideBarRefresh: boolean;
  setSideBarRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextType>({
  chatId: "",
  setChatId: () => null,
  sideBarRefresh: true,
  setSideBarRefresh: () => null,
});

export default ChatContext;
