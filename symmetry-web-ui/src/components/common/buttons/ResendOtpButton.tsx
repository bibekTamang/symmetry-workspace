import { useState, useEffect, useRef } from "react";

interface ResendButtonProps {
  onResend: () => Promise<void> | void; // Accept a promise to track network state
}

export const ResendOtpButton = ({ onResend }: ResendButtonProps) => {
  const [countdown, setCountdown] = useState<number>(60);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startCountdown = (seconds: number = 60) => {
    clearTimer();
    setCountdown(seconds);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimer();
  }, []);

  const handleResendClick = async () => {
    if (countdown > 0 || isSubmitting) return;

    try {
      setIsSubmitting(true);

      await onResend();

      startCountdown(60);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled = countdown > 0 || isSubmitting;

  return (
    <button
      type="button"
      className={`font-semibold text-sm transition-colors ${
        isButtonDisabled
          ? "text-gray-400 cursor-not-allowed no-underline"
          : "text-brand-primary hover:underline cursor-pointer"
      }`}
      onClick={handleResendClick}
      disabled={isButtonDisabled}
    >
      {isSubmitting
        ? "Sending..."
        : countdown > 0
          ? `Resend in ${countdown}s`
          : "Resend"}
    </button>
  );
};
