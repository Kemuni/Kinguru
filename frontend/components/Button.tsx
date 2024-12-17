import {cva, VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";
import React from "react";


const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-xl
  font-[family-name:var(--font-subheader)] transition-opacity
  hover:opacity-85
  active:outline active:outline-offset-1
  focus-visible:outline-none focus-visible:ring-1
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        primary: 'bg-[var(--native-focus-color)] text-white active:outline-[var(--native-focus-color)]',
        secondary: 'bg-[var(--additional-focus-fill)] text-[var(--native-focus-color)]',
        dark: 'bg-[var(--native-bg-color)] text-white',
        secondary_dark: 'bg-[var(--native-secondary-bg-color)] text-white',
      },
      size: {
        default: 'h-10 rounded-xl px-4 py-4 text-lg',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-11 rounded-xl px-10 text-xl',
        xl: 'h-12 rounded-xl px-16 text-2xl',
        icon: 'h-10 w-10',
        icon_auto: 'h-auto w-auto',
        catalog: 'h-6 px-12 py-2 rounded-xl text-xs w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: "default",
    }
  }
);


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {

}


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, ...props}, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";
export { Button, buttonVariants };
