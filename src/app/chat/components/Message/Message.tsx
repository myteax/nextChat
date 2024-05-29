import React from "react";
import { Message } from "ai/react";
import UserAvatar from "@/app/chat/components/Avatar/UserAvatar";
import AIAvatar from "@/app/chat/components/Avatar/AIAvatar";
import Image from "next/image";

const MessageComponent = ({
  m,
  isLastMessage,
  isLoading,
}: {
  m: Message;
  isLastMessage: boolean;
  isLoading: boolean;
}) => {
  if (isLastMessage && m.role !== "user") {
    return (
      <div className={"message-container relative"}>
        <div className="message-content-wrapper bg-gray-200 text-black">
          <div className={"absolute top-[-25px] left-[-10px]"}>
            <AIAvatar />
          </div>
          <div className={"flex-col"}>
            <div className={"relative"}>
              {isLoading ? (
                <Image
                  src={"/Assets/loader.svg"}
                  alt={"loader"}
                  width={80}
                  height={1}
                />
              ) : null}
            </div>
            {m.content}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={
        m.role === "user"
          ? "message-container justify-end relative"
          : "message-container relative"
      }
    >
      <div
        className={
          m.role === "user"
            ? "bg-gray-700 message-content-wrapper"
            : "message-content-wrapper bg-gray-200 text-black"
        }
      >
        <div className={"absolute top-[-25px] left-[-10px]"}>
          {m.role === "user" ? null : <AIAvatar />}
        </div>
        {m.content}
      </div>
    </div>
  );
};

export default MessageComponent;
