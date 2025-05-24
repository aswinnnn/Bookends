import React, { PropsWithChildren, ReactNode, Ref } from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from '../../ThemeContext';

interface BaseProps {
  className?: string;
  [key: string]: unknown;
}

export const Button = React.forwardRef<HTMLSpanElement, Omit<
  PropsWithChildren<{
    active: boolean;
    reversed: boolean;
  } & BaseProps>,
  'ref'
>>(
  (
    { className = '', active, reversed, ...props },
    ref
  ) => {
    const {themeMode} = useTheme();

    return (
    <span
      {...props}
      ref={ref}
      className={`w-fit m-2 p-1 rounded-md cursor-pointer ${reversed
          ? active
            ? 'text-white'
            : 'text-gray-400'
          : active
            ? 'text-black'
            : 'text-gray-300'
        } ${themeMode === "light" ? "bg-bookends-accent":"bg-bookends-dark-accent"} ${className}`}
    />
  )}
);

// export const Icon = React.forwardRef(
//   (
//     { className = '', ...props }: PropsWithChildren<BaseProps>,
//     ref: Ref<HTMLSpanElement>
//   ) => (
//     <span
//       {...props}
//       ref={ref}
//       className={`material-icons text-lg align-text-bottom ${className}`}
//     />
//   )
// );

export const Instruction = React.forwardRef(
  (
    { className = '', ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <div
      {...props}
      ref={ref}
      className={`whitespace-pre-wrap mx-[-20px] mb-2.5 p-2.5 text-sm bg-[#f8f8e8] ${className}`}
    />
  )
);

export const Menu = React.forwardRef(
  (
    { className = '', ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={`flex space-x-4 ${className}`}
    />
  )
);

export const Portal = ({ children }: { children?: ReactNode }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export const Toolbar = React.forwardRef(
  (
    { className = '', ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={`relative px-0 pb-2 pt-0 mb-5 border-b-2 border-gray-200 ${className}`}
    />
  )
);