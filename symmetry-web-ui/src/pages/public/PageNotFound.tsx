import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-3xl font-bold text-slate-900">404 - Not Found</h1>
      <p className="mt-2 text-slate-600">
        The content you are looking for is not present
      </p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
        Return to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
