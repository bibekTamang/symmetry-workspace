import React from "react";
import { useTranslation } from "react-i18next";
import LoginFrom from "../../components/forms/public/LoginForm";
import { ButtonWithIcon } from "../../components/common/buttons/ButtonWithIcon";
import { Link } from "react-router";
import GoogleIcon from "../../assets/google-icon.png";

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-brand-dark">
        {t("auth.login_title")}
      </h2>
      <p className="mt-2 text-sm text-brand-muted">
        {t("auth.login_subtitle")}
      </p>
      <LoginFrom />
      <div className="relative flex items-center justify-center my-8">
        <hr className="w-full border-slate-200" />
        <span className="absolute bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Or
        </span>
      </div>
      <ButtonWithIcon buttonText="Continue with Google" icon={GoogleIcon} />
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
  );
};
export default LoginPage;
