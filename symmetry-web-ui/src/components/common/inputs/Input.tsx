import { forwardRef, type InputHTMLAttributes } from "react";
import { MdErrorOutline } from "react-icons/md";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "w-full", id, ...props }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className="space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-brand-dark"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`input
            ${
              error
                ? "error-border focus:ring-red-500/20"
                : "border-brand-border focus:border-brand-primary focus:ring-brand-primary/20"
            }
            ${className}
          `}
          {...props}
        />

        {error ? (
          <p className="text-xs font-medium error-text animate-fade-in flex items-center gap-1">
            <MdErrorOutline /> {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-brand-muted">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
