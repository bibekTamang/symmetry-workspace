import { useForm } from "react-hook-form";
import { Input } from "../../common/inputs/Input";
import { useTranslation } from "react-i18next";
import type { RegistrationFormInputs } from "../../../types/FormTypes";
import type { UserRole } from "../../../types/AuthTypes";
import { EmailRegex } from "../../../constants/regex";
import { useState } from "react";
import { getErrorMessage } from "../../../utils/getErrorMesage";
import { api } from "../../../lib/axios";
import Spinner from "../../common/loaders/Spinner";
import { HttpStatusCode } from "axios";
import ErrorCard from "../../common/cards/errors/ErrorCard";

interface RegistrationProps {
  role: UserRole;
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegistrationForm = ({ role, setFormSubmitted }: RegistrationProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>();
  const onFormSubmit = async (data: RegistrationFormInputs) => {
    try {
      setIsLoading(true);
      setAuthError("");
      const response = await api.post("/auth/register", {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        password: data.password,
        role: role,
      });
      if (response.status === HttpStatusCode.Created) {
        setFormSubmitted(true);
      }
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
      <div className="grid grid-cols-2 gap-2">
        <Input
          label={t("labels.first_name")}
          type="text"
          placeholder="Jhon"
          error={errors.first_name?.message}
          {...register("first_name", {
            required: t("helper-text.first_name_required"),
          })}
        />
        <Input
          label={t("labels.last_name")}
          type="text"
          placeholder="Doe"
          error={errors.last_name?.message}
          {...register("last_name", {
            required: t("helper-text.last_name_required"),
          })}
        />
      </div>
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
      <Input
        label={t("labels.confirm_password")}
        type="text"
        placeholder="********"
        error={errors.confirm_password?.message}
        {...register("confirm_password", {
          required: t("helper-text.confirm_password_required"),
        })}
      />
      <button
        type="submit"
        className="w-full btn-primary disabled:opacity-70 flex justify-center"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : <>{t("button.sign_up_free")}</>}
      </button>
    </form>
  );
};

export default RegistrationForm;
