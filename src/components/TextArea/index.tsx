// import React, { TextareaHTMLAttributes, forwardRef } from 'react';
// import clsx, { ClassValue } from 'clsx';

// type ButtonProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
//   size?: 'small' | 'medium' | 'large';
//   variant?:
//     | 'primary'
//     | 'secondary'
//     | 'tertiary'
//     | 'tag'
//   className?: ClassValue;
// };

// export function classNames(...classes: any) {
//     return classes.filter(Boolean).join(' ')
//   }

// export const textAreaSizeClasses = {
//   small: 'px-1 py-1',
//   medium: 'px-3 py-2',
//   large: 'px-6 py-3',
// };

// export const buttonVariantClasses = {
//   primary:
//     'inline-flex items-center rounded-md bg-primary text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600',
//   secondary:
//     'border border-primary hover:border-primary-900 hover:text-primary-900 rounded-md text-primary text-sm',
//   tag:
//     'border min-w-12 border-primary hover:border-primary-900 hover:text-primary-900 rounded-full text-primary text-sm',
//   tertiary: 'hover:text-primary-900 rounded-lg text-text-weak text-sm',
// };


// const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//   (
//     { size = 'medium', variant = 'secondary', children, className, ...rest },
//     ref,
//   ) => {
//     const sizeClass = buttonSizeClasses[size] || buttonSizeClasses.medium;

//     const variantClass = buttonVariantClasses[variant] || buttonVariantClasses.secondary;

//     const userClasses = clsx(className);

//     return (
//       <textarea
//         className={classNames(
//           sizeClass,
//           variantClass,
//           userClasses,
//         )}
//         // ref={ref}
//         {...rest}
//       >
//         {children}
//       </textarea>
//     );
//   },
// );
// Button.displayName = 'Button';

// export { Button };