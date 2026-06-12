import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../common/inputs/Input";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const slots = Array.from({ length: 6 }, (_, i) => i);

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

  const onFormSubmit = (data: OtpFormInputs) => {
    const combinedOtp = data.otp.join("");
    if (!combinedOtp) {
      return;
    }
    try {
      setIsSubmitting(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="mt-8 space-y-4">
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
    </form>
  );
};
