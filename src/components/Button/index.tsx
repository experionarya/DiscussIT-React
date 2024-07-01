// import React, { ButtonHTMLAttributes, forwardRef } from 'react';
// import clsx, { ClassValue } from 'clsx';
// // import { classNames } from 'src/utils/className';

// type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
//   size?: 'small' | 'medium' | 'large';
//   variant?:
//     | 'primary'
//     | 'secondary'
//     | 'subtle'
//     | 'link'
//     | 'warning'
//     | 'danger'
//     | 'subtle-primary'
//     | 'subtle-danger';
//   className?: ClassValue;
// };

// export const buttonSizeClasses = {
//   small: 'px-2 py-1 text-xs !rounded',
//   medium: 'px-3 py-2 text-sm',
//   large: 'px-6 py-3 text-md',
// };

// export const buttonVariantClasses = {
//   primary:
//     'bg-primary text-on-primary hover:bg-primary-500 active:bg-primary-600',
//   secondary:
//     'bg-white text-gray-900 ring-1 ring-inset ring-gray-400 hover:bg-gray-50 hover:ring-gray-500 active:bg-gray-100 dark:bg-neutral-700 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-800 dark:hover:ring-neutral-600 dark:active:bg-neutral-900',
//   subtle:
//     'bg-transparent text-gray-800 !shadow-none hover:bg-gray-300/50 active:bg-gray-400/50 dark:text-neutral-300 dark:hover:bg-neutral-700/50 dark:active:bg-neutral-700',
//   link: 'bg-transparent text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 hover:underline !shadow-none',
//   warning: 'bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800',
//   danger:
//     'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-700 dark:hover:bg-red-800 dark:active:bg-red-900',
//   'subtle-primary':
//     'bg-transparent text-primary-600 !shadow-none hover:bg-gray-300/50 active:bg-gray-400/50 dark:text-primary-400 dark:hover:bg-neutral-700/50 dark:active:bg-neutral-700',
//   'subtle-danger':
//     'bg-transparent text-red-600 !shadow-none hover:bg-gray-300/50 active:bg-gray-400/50 dark:text-red-400 dark:hover:bg-neutral-700/50 dark:active:bg-neutral-700',
// };

// export const buttonBaseClasses =
//   'inline-flex cursor-pointer touch-manipulation select-none items-center justify-center gap-[1ch] rounded-md font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] active:translate-y-px active:shadow-none focus-visible:outline-light-focus dark:focus-visible:outline-dark-focus';

// export const disabledClass =
//   'disabled:pointer-events-none disabled:cursor-not-allowed  disabled:opacity-50';
// const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//   (
//     { size = 'medium', variant = 'secondary', children, className, ...rest },
//     ref,
//   ) => {
//     const sizeClass = buttonSizeClasses[size] || buttonSizeClasses.medium;

//     const variantClass =
//       buttonVariantClasses[variant] || buttonVariantClasses.secondary;

//     const userClasses = clsx(className);

//     return (
//       <button
//         className={classNames(
//           buttonBaseClasses,
//           sizeClass,
//           variantClass,
//           userClasses,
//           disabledClass,
//         )}
//         ref={ref}
//         {...rest}
//       >
//         {children}
//       </button>
//     );
//   },
// );
// Button.displayName = 'Button';

// export { Button };