import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import RegistrationForm from "../../components/forms/public/RegistrationForm";
import type { UserRole } from "../../types/AuthTypes";
import RoleSelectCard from "../../components/common/cards/RoleSelectCard";
import { Link } from "react-router";

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const [role, setRole] = useState<UserRole>("gym_admin");

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-brand-dark">
        {t("auth.register_title")}
      </h2>
      <p className="mt-1.5 text-sm text-brand-muted">
        {t("auth.register_subtitle")}
      </p>
      <RoleSelectCard role={role} setRole={setRole} />
      <RegistrationForm role={role} />
      <p className="mt-5 text-center text-sm text-brand-muted">
        {t("auth.have_account")}{" "}
        <Link to="/auth/login" className="btn-link">
          {t("button.log_in_here")}
        </Link>
      </p>
    </div>
  );
};
export default RegisterPage;
