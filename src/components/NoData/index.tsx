import React, { ReactElement } from "react";

type NodataType = {
  data: string;
};
export default function NoData({ data }: NodataType): ReactElement {
  return (
    <div className="space-y flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <img
          src={require(`../../assets/images/nodata.png`)}
          alt="person"
          className="size-32"
        />
      </div>
      <p className="text-sm flex justify-center">{data}</p>
    </div>
  );
}
