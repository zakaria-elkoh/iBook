import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Toaster } from "sonner";
import "../pages/Home.css";

const DefaultLayout = () => {
  return (
    <main className="min-h-screen">
      <Toaster
        position="bottom-right"
        closeButton
        // richColors
        toastOptions={{
          style: {
            minWidth: "200px",
            maxWidth: "400px",
            padding: "13px 16px",
            fontSize: "0.85rem",
          },
          duration: 5000,
        }}
      />
      <NavBar />
      <div className="">
        <Outlet />
      </div>
    </main>
  );
};

export default DefaultLayout;
