import React, { ReactElement } from "react";
import Grid from "src/components/Grid";

export default function Post(): ReactElement {
  return (
    <div>
      <h1 className="font-semibold pb-3 text-xl text-slate-900">
        NetWork Security
      </h1>
      <div className="space-y-3">
        <Grid />
        <Grid />
      </div>
    </div>
  );
}
