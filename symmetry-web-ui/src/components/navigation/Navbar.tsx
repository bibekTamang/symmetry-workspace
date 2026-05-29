import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center space-x-2 font-bold text-xl tracking-tight text-[#0F172A]">
          <span className="inline-block rounded-lg bg-brand-primary p-2 text-white">
            SY
          </span>
          <span>Symmetry</span>
        </div>
        <nav className="hidden space-x-8 font-medium text-sm text-brand-muted md:flex">
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
            className="font-medium text-sm text-brand-muted hover:text-brand-dark transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/auth/register"
            className="rounded-lg bg-brand-primary px-4 py-2.5 font-medium text-sm text-white shadow-sm hover:bg-brand-hover transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
