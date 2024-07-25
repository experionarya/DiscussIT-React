import React, { ReactElement } from "react";
type data = {
    data: string;
}
export default function NoData({data}: data): ReactElement {
    return (
        <div className="space-y-2 flex flex-col justify-center items-center">
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
