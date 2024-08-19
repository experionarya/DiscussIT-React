import React, { ReactElement } from "react";
import classNames from "classnames";

type AvatarProps = {
  userName: string;
  size: "small" | "medium" | "large"; 
};

export function Avatar({ userName, size }: AvatarProps): ReactElement {
  const sizeClasses = {
    small: "h-6 w-6 text-xs",
    medium: "h-8 w-8",
    large: "h-16 w-16 text-3xl",
  };

  const avatarClass = classNames(
    "bg-orange-400 rounded-full flex justify-center items-center",
    sizeClasses[size]
  );

  return (
    <div className={avatarClass}>
      <p className="text-white font-semibold">{userName}</p>
    </div>
  );
}