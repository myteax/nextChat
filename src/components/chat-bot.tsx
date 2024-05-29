import Link from "next/link";
import React from "react";

export function ChatBot() {
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center ">
      <div className="bg-amber-600 flex justify-center items-center rounded hover:bg-amber-700 w-[200px] cursor-pointer">
        <a
          className="w-[200px]  px-6 py-2  text-center "
          href={"/api/auth/login"}
        >
          {" "}
          Login{" "}
        </a>
      </div>
    </div>
  );
}
