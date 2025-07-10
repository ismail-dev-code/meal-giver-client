import { Link, useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-accent hover:bg-accent/90 text-white cursor-pointer px-5 py-2 rounded-lg font-medium transition"
          >
            Go Back
          </button>

          <Link
            to="/"
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg cursor-pointer font-medium transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
