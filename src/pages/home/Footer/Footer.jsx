import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router";
import MealGiverLogo from "../../../components/MealGiver/MealGiverLogo";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-10 pb-6">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/20 pb-6">
        {/* Column 1 */}
        <div>
          <h2 className="text-xl font-bold mb-3">
            <MealGiverLogo />
          </h2>
          <p className="text-sm text-white/80">
            Reducing food waste and nourishing communities — through every
            meaningful donation.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/about-us" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/all-donations" className="hover:underline">
                Browse Donations
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="hover:text-accent transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="hover:text-accent transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:text-accent transition" />
            </a>
            <a
              href="https://www.linkedin.com/in/ismail-hossain24"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="hover:text-accent transition" />
            </a>
          </div>
        </div>
      </div>

      <p className="text-center text-xs mt-6 text-white/70">
        &copy; {new Date().getFullYear()} MealGiver. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
