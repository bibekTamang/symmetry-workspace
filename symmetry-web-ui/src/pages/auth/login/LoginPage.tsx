import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import LoginFrom from "../../../components/forms/public/LoginForm";

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block bg-brand-dark">
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/90 via-transparent to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <blockquote className="text-xl font-medium italic">
            "Symmetry completely transformed how we manage member attendance and
            workout distribution across both our athletic branches."
          </blockquote>
          <p className="mt-3 font-semibold text-sm tracking-wide uppercase text-brand-primary">
            — Ironworks Performance Club
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 bg-[#F8FAFC] rounded-l-4xl">
        <div className="mx-auto w-full max-w-md bg-white p-8 rounded-2xl border border-brand-border shadow-sm">
          {/* Logo Heading Identity */}
          <div className="flex items-center space-x-2 font-bold text-xl tracking-tight text-brand-dark mb-8">
            <span className="inline-block rounded-lg bg-brand-primary p-2 text-white">
              SY
            </span>
            <span>Symmetry</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-brand-dark">
            {t("auth.login_title")}
          </h2>
          <p className="mt-2 text-sm text-brand-muted">
            {t("auth.login_subtitle")}
          </p>
          <LoginFrom />
          <p className="mt-6 text-center text-sm text-brand-muted">
            {t("auth.no_account")}{" "}
            <Link
              to="/auth/register"
              className="font-semibold text-brand-primary hover:underline"
            >
              {t("button.register")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
