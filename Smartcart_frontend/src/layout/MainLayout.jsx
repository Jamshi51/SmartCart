import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <Outlet /> {/* Page content comes here */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
