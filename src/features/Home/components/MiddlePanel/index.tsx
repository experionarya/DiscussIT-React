import React, { ReactElement } from "react";
import Grid from "../../../../components/Grid";

export default function MiddlePanel(): ReactElement {
  return (
    <div className="p-5 overflow-auto">
      <Grid/>
    </div>
  );
}
