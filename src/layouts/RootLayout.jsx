import { Outlet } from "react-router";
import Navbar from "../shared/Navbar/Navbar";
import Banner from "../pages/home/banner/Banner";
import Footer from "../pages/home/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Banner />
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
