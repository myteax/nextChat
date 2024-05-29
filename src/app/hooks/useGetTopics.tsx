import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const useGetTopics = (shouldRefresh: boolean) => {
  const [topics, setTopics] = useState<{ chatId: string; topic: string }[]>();

  const { user } = useUser();

  useEffect(() => {
    const getTopics = async () => {
      if (user) {
        const result = await fetch(`/api/chat/getTopics`, {
          method: "POST",
          body: JSON.stringify({
            userId: user?.sub,
          }),
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await result.json();
        setTopics(data.topics);
      }
    };
    if (shouldRefresh) {
      getTopics();
    }
  }, [user, shouldRefresh]);
  return {
    topics,
  };
};

export default useGetTopics;
