import { Outlet } from "react-router";
import Navbar from "../shared/Navbar/Navbar";
import Banner from "../pages/home/banner/Banner";
import Footer from "../pages/home/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar></Navbar>

      <Outlet />

      <Footer />
    </>
  );
};

export default RootLayout;
