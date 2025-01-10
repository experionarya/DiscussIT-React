import React, { ButtonHTMLAttributes, forwardRef } from "react";
import clsx, { ClassValue } from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "danger"| "text";
  className?: ClassValue;
};

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const buttonSizeClasses = {
  small: "px-1 py-1",
  medium: "px-3 py-2",
  large: "px-10 py-2",
};

export const disabledClass =
  "disabled:pointer-events-none disabled:cursor-not-allowed  disabled:opacity-50";
export const buttonBaseClasses =
  "inline-flex items-center rounded-md text-sm shadow-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export const buttonVariantClasses = {
  primary:
    "bg-primary text-white hover:bg-primary-600 focus-visible:outline-sky-600",
  secondary:
    "border border-stroke-stong/50 text-slate-700 bg-white hover:bg-primary-50 hover:border-primary hover:text-primary",
  danger: "bg-red-600 text-white hover:bg-red-400",
  text: "text-slate-700 hover:text-slate-900",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { size = "medium", variant = "secondary", children, className, ...rest },
    ref
  ) => {
    const sizeClass = buttonSizeClasses[size] || buttonSizeClasses.medium;

    const variantClass =
      buttonVariantClasses[variant] || buttonVariantClasses.secondary;

    const userClasses = clsx(className);

    return (
      <button
        className={classNames(
          sizeClass,
          variantClass,
          userClasses,
          buttonBaseClasses,
          disabledClass
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
