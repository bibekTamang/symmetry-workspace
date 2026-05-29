import { forwardRef, type InputHTMLAttributes } from "react";
import { MdErrorOutline } from "react-icons/md";

// 1. Extend standard HTML Input attributes so your component accepts all native props (type, placeholder, disabled, etc.)
interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ label, error, helperText, rows, className = "", id, ...props }, ref) => {
    const inputId =
      id || `textarea-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-brand-dark"
          >
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          className={`input resize-none
            ${
              error
                ? "error-border focus:ring-red-500/20"
                : "border-brand-border focus:border-brand-primary focus:ring-brand-primary/20"
            }
            ${className}
          `}
          rows={rows}
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

TextArea.displayName = "TextArea";
