import React, { ReactElement } from "react";
import Grid from "src/components/Grid";
// import { useNavigate} from 'react-router-dom';

// import { ChevronRightIcon as ChevronRightIconMicro } from "@heroicons/react/24/solid";

export default function Post(): ReactElement {
  // const navigate = useNavigate();

  return (
    <div>
      <h1 className="font-semibold pl-2 pb-3 text-xl text-slate-900">
        NetWork Security
      </h1>
      <div className="space-y-3">
        <Grid />
        <Grid />
      </div>
    </div>
  );
}
