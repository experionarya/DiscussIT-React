import React, { ReactElement } from "react";

export default function Community(): ReactElement {
  return (
    <div className="bg-fill h-full m-0 p-0 pt-16">
      <div>
        Community Create React App does not support custom PostCSS
        configurations and is incompatible with many important tools in the
        PostCSS ecosystem, like `postcss-import`. We highly recommend using
        Vite, Parcel, Next.js, or Remix instead of Create React App. They
        provide an equivalent or better developer experience but with more
        flexibility, giving you more control over how Tailwind and PostCSS are
        configured.
      </div>
    </div>
  );
}
