import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router";
import RegistrationForm from "../../../components/forms/public/RegistrationForm";
import type { UserRole } from "../../../types/AuthTypes";
import { CgGym } from "react-icons/cg";
import { RiUser5Fill } from "react-icons/ri";

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>("gym_admin");

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-brand-dark">
      <div className="relative hidden lg:block ">
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/90 via-transparent to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <p className="text-2xl font-bold tracking-tight">
            Precision performance metrics tracking engine.
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Run a transparent operation using data streams mapped directly from
            real lift feedback loops across all device categories.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 bg-[#F8FAFC] rounded-l-4xl">
        <div className="mx-auto w-full max-w-lg bg-white p-8 rounded-2xl border border-brand-border shadow-sm">
          <div className="flex items-center space-x-2 font-bold text-xl tracking-tight text-brand-dark mb-6">
            <span className="inline-block rounded-lg bg-brand-primary p-2 text-white">
              SY
            </span>
            <span>Symmetry</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-brand-dark">
            {t("auth.register_title")}
          </h2>
          <p className="mt-1.5 text-sm text-brand-muted">
            {t("auth.register_subtitle")}
          </p>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-brand-dark mb-2">
              {t("labels.role")}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("gym_admin")}
                className={`btn-tab ${role === "gym_admin" ? "active-tab" : "inactive-tab"}`}
              >
                <CgGym size={20} /> {t("auth.role_admin")}
              </button>
              <button
                type="button"
                onClick={() => setRole("individual")}
                className={`btn-tab ${role === "individual" ? "active-tab" : "inactive-tab"}`}
              >
                <RiUser5Fill size={20} /> {t("auth.role_member")}
              </button>
            </div>
          </div>
          <RegistrationForm role={role} />
          <p className="mt-5 text-center text-sm text-brand-muted">
            {t("auth.have_account")}{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-brand-primary hover:underline"
            >
              {t("button.log_in_here")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
