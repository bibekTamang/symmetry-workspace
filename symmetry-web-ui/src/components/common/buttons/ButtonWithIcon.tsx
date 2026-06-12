import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string | React.ReactNode;
  buttonText: string;
  iconPosition?: "left" | "right";
}

export const ButtonWithIcon: React.FC<ButtonProps> = ({
  icon,
  buttonText,
  iconPosition = "left",
  ...props
}) => {
  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === "string") {
      return <img src={icon} width={18} alt="btn_icon" aria-hidden="true" />;
    }

    return icon;
  };

  return (
    <button
      className="btn-frame flex items-center justify-center w-full gap-3 border border-brand-primary mt-2 hover:bg-blue-50"
      {...props}
    >
      {iconPosition === "left" && renderIcon()}
      <span>{buttonText}</span>
      {iconPosition === "right" && renderIcon()}
    </button>
  );
};
