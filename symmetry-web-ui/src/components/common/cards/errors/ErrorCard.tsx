interface ErrorCardProps {
  message: string;
}
const ErrorCard = ({ message }: ErrorCardProps) => {
  return (
    <div className="py-2 px-6 bg-red-100 border border-red-300 text-red-700 text-center text-sm w-full">
      {message}
    </div>
  );
};

export default ErrorCard;
