import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { LoginFormInputs } from "../../../types/FormTypes";
import { Input } from "../../common/inputs/Input";
import { useAuth } from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const LoginFrom = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const from = location.state?.from?.pathname || "/dashboard";

  const onFormSubmit = async (data: LoginFormInputs) => {
    try {
      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
      const mockUser = {
        id: "usr_1092",
        email: data.email,
        role: "gym_admin" as const,
        gymId: "gym_9901",
      };

      login(mockToken, mockUser);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Authentication submission process failed", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="mt-5 space-y-3.5">
      <Input
        label={t("labels.email")}
        type="text"
        placeholder="Jhon@gmail.com"
        error={errors.email?.message}
        {...register("email", {
          required: t("helper-text.email_required"),
        })}
      />
      <Input
        label={t("labels.password")}
        type="text"
        placeholder="********"
        error={errors.password?.message}
        {...register("password", {
          required: t("helper-text.password_required"),
        })}
      />
      <button type="submit" className="w-full btn-primary">
        {t("button.sign_in")}
      </button>
    </form>
  );
};

export default LoginFrom;
