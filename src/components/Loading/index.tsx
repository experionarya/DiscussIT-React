import React, { ReactElement } from "react";

export function Loading(): ReactElement {
  return (
    <>
      <div className="border-gray-300 size-16 animate-spin rounded-full border-8 border-t-primary" />
    </>
  );
}
