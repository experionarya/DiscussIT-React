import React, { ReactElement } from "react";

type userName = {
    userName: string;
}
export default function Avatar({userName}:userName): ReactElement {
  return (
    <div className="bg-orange-500 h-8 w-8 rounded-full flex justify-center items-center">
        <p className="text-white font-semibold">{userName}</p>
    </div>
  );
}
