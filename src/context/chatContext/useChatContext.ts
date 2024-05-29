import { useContext } from "react";

import ChatContext from "@/context/chatContext/context";

export const useChatContext = () => useContext(ChatContext);
