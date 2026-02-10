import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-eco-primary-600 text-white hover:bg-eco-primary-700 active:bg-eco-primary-800 shadow-sm",
  secondary:
    "bg-eco-secondary-600 text-white hover:bg-eco-secondary-700 active:bg-eco-secondary-800 shadow-sm",
  outline:
    "border-2 border-eco-primary-600 text-eco-primary-700 hover:bg-eco-primary-50 active:bg-eco-primary-100",
  ghost:
    "text-eco-neutral-600 hover:bg-eco-neutral-100 active:bg-eco-neutral-200",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-7 py-3 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`focus-visible:ring-eco-primary-500 inline-flex cursor-pointer items-center justify-center font-medium transition-colors duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className} `}
      disabled={disabled ?? isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="mr-2 -ml-1 h-4 w-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
