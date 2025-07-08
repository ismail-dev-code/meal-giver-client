import { FaLock } from "react-icons/fa";
import { Link } from "react-router"; 

const Forbidden = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-6 text-center">
      <FaLock className="text-7xl text-error mb-4 animate-pulse" />
      <h1 className="text-4xl font-extrabold text-error mb-2">403 - Access Denied</h1>
      <p className="text-lg text-gray-600 max-w-xl">
        You don't have permission to view this page. If you think this is an error, please contact your administrator or try logging in with the correct role.
      </p>

      <Link to="/" className="mt-6">
        <button className="btn btn-error btn-outline px-6 py-2 rounded-md">
          Return to Home
        </button>
      </Link>
    </section>
  );
};

export default Forbidden;
