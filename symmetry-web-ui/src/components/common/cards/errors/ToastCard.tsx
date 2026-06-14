import type { Dispatch, SetStateAction } from "react";
import { IoCloseOutline } from "react-icons/io5";

const VARIANT_MAP = {
  Error: "bg-red-100 border-red-300 text-red-700",
  Success: "bg-green-100 border-green-300 text-green-700",
  Warning: "bg-yellow-100 border-yellow-300 text-yellow-700",
  Info: "bg-blue-100 border-blue-300 text-blue-700",
} as const;

interface ToastCardProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string | null | undefined>>;
  type: keyof typeof VARIANT_MAP;
}
const ToastCard = ({ message, setMessage, type }: ToastCardProps) => {
  return (
    <div
      className={`mb-4 py-2 px-6 border text-center text-sm w-full relative ${VARIANT_MAP[type]}`}
    >
      {message}
      <button
        type="button"
        onClick={() => setMessage(null)}
        className="absolute top-0.5 right-0.5 cursor-pointer"
      >
        <IoCloseOutline size={22} />
      </button>
    </div>
  );
};

export default ToastCard;
