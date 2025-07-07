
import { Outlet } from "react-router";



const RootLayout = () => {
  return (
    <>
     
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
    
    </>
  );
};

export default RootLayout;