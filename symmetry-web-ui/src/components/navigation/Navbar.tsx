import { Link } from "react-router";
import Brand from "../Brand";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-transparent px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Brand variant="Light" />
        <nav className="hidden space-x-8 font-medium text-sm text-brand-light md:flex">
          <a
            href="#features"
            className="hover:text-brand-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hover:text-brand-primary transition-colors"
          >
            Pricing
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            to="/auth/login"
            className="font-medium text-sm text-brand-light hover:text-brand-primary transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
