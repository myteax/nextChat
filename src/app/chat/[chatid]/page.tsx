"use client";
import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import SideBar from "@/app/chat/components/SideBar";
import ChatBody from "@/app/chat/components/chatBody";
import useGetTopics from "@/app/hooks/useGetTopics";
import { useChatContext } from "@/context/chatContext/useChatContext";
import Image from "next/image";

const Page = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const { sideBarRefresh, setSideBarRefresh } = useChatContext();

  const { topics } = useGetTopics(sideBarRefresh);

  useEffect(() => {
    if (topics?.length) {
      setSideBarRefresh(false);
    }
  }, [topics]);

  if (isLoading) {
    return (
      <div className={"h-screen flex justify-center items-center"}>
        <Image
          src={"/Assets/loader.svg"}
          alt={"loader"}
          width={80}
          height={1}
        />
      </div>
    );
  }

  if (!user && !isLoading) {
    router.push("/");
    return <div> ...Redirecting </div>;
  }

  return (
    <>
      <div className="grid grid-cols-chatCustomBody gap-4  ">
        <div className=" bg-gray-200 h-screen">
          <SideBar topics={topics ?? []} />
        </div>
        <div>
          <ChatBody />
        </div>
      </div>
    </>
  );
};

export default Page;
