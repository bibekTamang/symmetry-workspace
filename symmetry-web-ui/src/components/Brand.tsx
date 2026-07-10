import { Link } from "react-router";

interface BrandProps {
  variant: "Dark" | "Light";
  className?: string;
}
const Brand = ({ variant, className }: BrandProps) => {
  return (
    <div className={`text-xl uppercase antialiased font-semibold ${className}`}>
      <Link to="/">
        <span
          className={`${variant === "Dark" ? "text-brand-dark" : "text-brand-light"}`}
        >
          Symme
        </span>
        <span className="text-brand-primary">try</span>
      </Link>
    </div>
  );
};

export default Brand;
