import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { LoginFormInputs } from "../../../types/FormTypes";
import { Input } from "../../common/inputs/Input";
import { useAuth } from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { api } from "../../../lib/axios";
import Spinner from "../../common/loaders/Spinner";
import { EmailRegex } from "../../../constants/regex";
import ErrorCard from "../../common/cards/errors/ErrorCard";
import { getErrorMessage } from "../../../utils/getErrorMesage";

const LoginFrom = () => {
  const [authError, setAuthError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      setAuthError(null);
      setIsLoading(true);
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { accessToken, user } = response.data;
      login(accessToken, user);
      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="mt-5 space-y-3.5">
      {authError && <ErrorCard message={authError} />}
      <Input
        label={t("labels.email")}
        type="text"
        placeholder="Jhon@gmail.com"
        error={errors.email?.message}
        {...register("email", {
          required: t("helper-text.email_required"),
          pattern: {
            value: EmailRegex,
            message: t("helper-text.email_invalid"),
          },
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
      <button
        type="submit"
        className="w-full btn-primary disabled:opacity-70 flex justify-center"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : <> {t("button.sign_in")}</>}
      </button>
    </form>
  );
};

export default LoginFrom;
