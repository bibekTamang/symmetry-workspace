import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../common/inputs/Input";
import ToastCard from "../../common/cards/errors/ToastCard";
import type { RouterNavigationState } from "../../../pages/auth/VerifyOtpPage";
import { useLocation } from "react-router";
import { api } from "../../../api/axiosInstance";
import { getErrorMessage } from "../../../utils/getErrorMesage";
import { ResendOtpButton } from "../../common/buttons/ResendOtpButton";
import { HttpStatusCode } from "axios";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setCredentials } from "../../../redux/features/auth/authSlice";

interface OtpFormInputs {
  otp: string[];
}

export const VerifyOtpForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<OtpFormInputs>({
    defaultValues: {
      otp: Array(6).fill(""),
    },
    mode: "onChange",
  });
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpMessage, setOtpMessage] = useState<string | null>();
  const location = useLocation();
  const slots = Array.from({ length: 6 }, (_, i) => i);
  const navigationState = location.state as RouterNavigationState | null;
  const targetEmail = navigationState?.email;
  console.log("targetEmail", targetEmail);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value;

    if (/[^\d]/.test(val)) {
      setValue(`otp.${index}`, "");
      return;
    }
    if (val.length > 1) {
      setValue(`otp.${index}`, val.slice(-1));
    }
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      const currentValue = getValues(`otp.${index}`);

      if (!currentValue && index > 0) {
        e.preventDefault();
        setValue(`otp.${index - 1}`, "");
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    pastedData.split("").forEach((char, i) => {
      setValue(`otp.${i}`, char, { shouldValidate: true });
    });

    const focusTargetIndex = Math.min(pastedData.length - 1, 5);
    const targetInput = document.getElementById(
      `otp-input-${focusTargetIndex}`,
    );
    targetInput?.focus();
  };

  const onFormSubmit = async (data: OtpFormInputs) => {
    const combinedOtp = data.otp.join("");
    if (!combinedOtp) {
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await api.post("/auth/verify-otp", {
        email: targetEmail,
        otp: combinedOtp,
      });
      if (response?.status === HttpStatusCode.Ok) {
        const { accessToken, user } = response.data;
        dispatch(setCredentials({ user, accessToken }));
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setOtpMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResend = async () => {
    try {
      await api.post("/auth/request-otp", {
        email: targetEmail,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setOtpMessage(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="mt-4 space-y-4">
      {otpMessage && (
        <ToastCard
          message={otpMessage}
          setMessage={setOtpMessage}
          type={`Error`}
        />
      )}
      <div className="flex justify-between gap-2" onPaste={handlePaste}>
        {slots.map((index) => (
          <Input
            key={index}
            id={`otp-input-${index}`}
            label=""
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            placeholder="-"
            disabled={isSubmitting}
            className="w-12 h-12 text-center text-lg font-bold rounded-md"
            {...register(`otp.${index}`, {
              required: true,
              onChange: (e) => handleInputChange(e, index),
            })}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(e, index)
            }
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full btn-primary disabled:opacity-50 mt-4"
      >
        {isSubmitting ? "Verifying..." : "Verify Code"}
      </button>
      <div>
        <ResendOtpButton onResend={onResend} />
      </div>
    </form>
  );
};
