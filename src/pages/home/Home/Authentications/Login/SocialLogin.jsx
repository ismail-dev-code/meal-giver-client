
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import useAuth from "../../../../../hooks/useAuth";




const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        console.log("Google User:", user);

        const userInfo = {
          email: user.email,
          name: user.displayName,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/users`,
            userInfo
          );
          console.log("User saved to DB:", res.data);
          toast.success("Signed in successfully!");
          navigate(from);
        } catch (error) {
          console.error("Error saving user to DB:", error);
          toast.error("Failed to save user info.");
        }
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        toast.error("Failed to sign in. Please try again.");
      });
  };

  return (
    <div className="mt-6 text-center">
      <div className="divider text-sm text-gray-500">OR</div>
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 hover:shadow-md transition duration-300"
      >
        <svg
          aria-label="Google logo"
          width="20"
          height="20"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="#fff" d="M0 0h512v512H0z" />
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            />
            <path
              fill="#4285f4"
              d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            />
            <path
              fill="#fbbc02"
              d="M90 341a208 200 0 010-171l63 49q-12 37 0 73"
            />
            <path
              fill="#ea4335"
              d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            />
          </g>
        </svg>
        <span className="font-medium">Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;