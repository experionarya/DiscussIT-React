import React, { ReactElement } from "react";
import classNames from "classnames";
import { getInitials } from "src/utils/common";

type AvatarProps = {
  userName: string;
  size: "small" | "medium" | "large";
};

export function Avatar({ userName, size }: AvatarProps): ReactElement {
  function generateColor(): string {
    let hash = 0;
    for (let i = 0; i < userName.length; i++) {
      hash = userName.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).slice(-2);
    }
    if (color === "#000000") {
      color = "#" + ("00" + ((hash & 0x00ff) + 1).toString(16)).slice(-2);
    }
    return color;
  }

  function isDark(color: string): boolean {
    const hex = color.substring(1, 7);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 < 120;
  }

  const sizeClasses = {
    small: "h-6 w-6 text-sm",
    medium: "h-8 w-8",
    large: "h-16 w-16 text-3xl",
  };

  const avatarClass = classNames(
    "rounded-full flex justify-center items-center",
    sizeClasses[size]
  );

  const backgroundColor = generateColor();
  const textColor = isDark(backgroundColor) ? "text-white" : "text-black/70";

  return (
    <div className={avatarClass} style={{ backgroundColor }}>
      <p className={`font-semibold ${textColor}`}>{getInitials(userName)}</p>
    </div>
  );
}
