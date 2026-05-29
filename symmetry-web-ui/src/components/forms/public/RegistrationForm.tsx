import { useForm } from "react-hook-form";
import { USER_ROLE } from "../../../constants/enum";
import { Input } from "../../common/inputs/Input";
import { useTranslation } from "react-i18next";
import { TextArea } from "../../common/inputs/TextArea";
import type { RegistrationFormInputs } from "../../../types/FormTypes";

interface RegistrationProps {
  role: string;
}

const RegistrationForm = ({ role }: RegistrationProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>();
  const onFormSubmit = async (data: RegistrationFormInputs) => {
    console.log("FORM DATA", data);
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="mt-5 space-y-3.5">
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
      <Input
        label={t("labels.confirm_password")}
        type="text"
        placeholder="********"
        error={errors.confirm_password?.message}
        {...register("confirm_password", {
          required: t("helper-text.confirm_password_required"),
        })}
      />
      {role === USER_ROLE.GYM_ADMIN && (
        <>
          <Input
            label={t("labels.gym_name")}
            type="text"
            placeholder="Iron Paradise"
            error={errors.gym_name?.message}
            {...register("gym_name", {
              required: t("helper-text.gym_name_required"),
            })}
          />
          <TextArea
            label={t("labels.gym_location")}
            type="text"
            placeholder="NH10 Metro, PIN 737102"
            error={errors.gym_name?.message}
            {...register("gym_location", {
              required: t("helper-text.gym_location_required"),
            })}
            rows={3}
            helperText={t("helper-text.verifiable_address")}
          />
        </>
      )}
      <button type="submit" className="w-full btn-primary">
        {t("button.sign_up_free")}
      </button>
    </form>
  );
};

export default RegistrationForm;
