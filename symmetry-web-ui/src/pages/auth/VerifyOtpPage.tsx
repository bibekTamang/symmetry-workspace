import { useTranslation } from "react-i18next";
import { VerifyOtpForm } from "../../components/forms/public/VerifyOtpForm";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export interface RouterNavigationState {
  fromAuthFlow?: boolean;
  email?: string;
  message?: string;
}

const VerifyOtpPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const navigationState = location.state as RouterNavigationState | null;

  useEffect(() => {
    if (!navigationState || !navigationState.fromAuthFlow) {
      navigate("/auth/login", { replace: true });
    }
  }, [navigationState, navigate]);

  if (!navigationState || !navigationState.fromAuthFlow) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-brand-dark">
        {t("auth.verify_otp")}
      </h2>
      <p className="mt-1.5 text-sm text-brand-muted">
        {t("auth.verify_subtitle")}
      </p>
      <VerifyOtpForm />
    </div>
  );
};

export default VerifyOtpPage;
