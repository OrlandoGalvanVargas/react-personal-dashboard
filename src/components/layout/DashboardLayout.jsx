import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout() {
  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={mainContentStyle}>
        <Navbar />

        <div style={contentAreaStyle}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
};

const mainContentStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const contentAreaStyle = {
  flex: 1,
  padding: "20px",
  overflowY: "auto",
};

export default DashboardLayout;
