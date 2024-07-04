import React, { ReactElement } from "react";
import Grid from "../../../../components/Grid";

export default function MiddlePanel(): ReactElement {
  return (
    <div className="col-span-2 space-y-3">
        <Grid />
        <Grid />
    </div>
  );
}
