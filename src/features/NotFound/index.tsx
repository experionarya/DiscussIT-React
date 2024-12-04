import React, { ReactElement } from "react";
import notfound from "../../assets/gif/notfound.gif";

export function NotFound(): ReactElement {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 4rem)", backgroundColor: "#f7f9fb" }}
    >
      <div
        style={{
          backgroundImage: `url(${notfound})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="size-96"
      />
    </div>
  );
}