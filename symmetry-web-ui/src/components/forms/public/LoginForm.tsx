import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { LoginFormInputs } from "../../../types/FormTypes";
import { Input } from "../../common/inputs/Input";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Spinner from "../../common/loaders/Spinner";
import { EmailRegex } from "../../../constants/regex";
import { getErrorMessage } from "../../../utils/getErrorMesage";
import CheckBox from "../../common/inputs/CheckBox";
import ToastCard from "../../common/cards/errors/ToastCard";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { login } from "../../../redux/features/auth/authThunk";
import type { ApiErrorResponse } from "../../../types/Api";
import { HttpStatusCode } from "axios";

const LoginFrom = () => {
  const [authError, setAuthError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onFormSubmit = async (data: LoginFormInputs) => {
    try {
      setAuthError(null);
      setIsLoading(true);
      const { email, password } = data;
      await dispatch(login({ email, password })).unwrap();
    } catch (error) {
      const apiError = error as {
        statusCode?: number;
        data?: ApiErrorResponse;
      };
      if (apiError?.statusCode === HttpStatusCode.Locked) {
        navigate("/auth/email-verify", {
          state: {
            fromAuthFlow: true,
            email: data.email,
            message:
              "Email is not verified, please verify by providing the otp sent to your mail.",
          },
          replace: true,
        });
        return;
      }
      const errorMessage = getErrorMessage(error);
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="mt-5 space-y-3.5">
      {authError && (
        <ToastCard message={authError} setMessage={setAuthError} type="Error" />
      )}
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
        type="password"
        placeholder="********"
        error={errors.password?.message}
        {...register("password", {
          required: t("helper-text.password_required"),
        })}
      />
      <div className="flex items-center justify-between mb-6">
        <CheckBox label={t("helper-text.remember_me")} />
        <Link to="/auth/resetpassword" className="btn-link text-xs">
          {t("button.forgot_password")}
        </Link>
      </div>

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
