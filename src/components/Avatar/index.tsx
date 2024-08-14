import React, { ReactElement } from "react";
import classNames from "classnames";

type AvatarProps = {
  userName: string;
  size: "small" | "medium" | "large"; 
};

export function Avatar({ userName, size }: AvatarProps): ReactElement {
  const sizeClasses = {
    small: "h-9 w-9",
    medium: "h-12 w-12",
    large: "h-16 w-16 text-3xl",
  };

  const avatarClass = classNames(
    "bg-primary-700 rounded-full flex justify-center items-center",
    sizeClasses[size]
  );

  return (
    <div className={avatarClass}>
      <p className="text-white font-semibold">{userName}</p>
    </div>
  );
}