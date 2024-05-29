import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

const UserAvatar = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }
  if (!user) {
    return null;
  }

  return (
    <div className="mr-4 flex items-center">
      <Image
        src={user.picture as string}
        alt={"user Avatar"}
        width={40}
        height={40}
        className="mr-1 rounded-3xl"
      />
      :
    </div>
  );
};

export default UserAvatar;
