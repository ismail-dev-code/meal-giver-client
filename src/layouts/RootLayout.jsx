
import { Outlet } from "react-router";
import Navbar from "../shared/Navbar/Navbar";



const RootLayout = () => {
  return (
    <>
     <Navbar></Navbar>
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
    
    </>
  );
};

export default RootLayout;