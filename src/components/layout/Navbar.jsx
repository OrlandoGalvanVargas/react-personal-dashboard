import { useAuth } from "../../store/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header style={navbarStyle}>
      <div style={breadcrumbStyle}>
        <span style={{ color: "#666" }}>
          {window.location.pathname.replace("/", "") || "Dashboard"}
        </span>
      </div>

      <div style={userInfoStyle}>
        <div style={avatarStyle}>
          {user?.name?.charAt(0)?.toUpperCase() || "?"}
        </div>
        <div>
          <div style={userNameStyle}>{user?.name || "Usuario"}</div>
          <div style={userEmailStyle}>{user?.email || ""}</div>
        </div>
      </div>
    </header>
  );
}

const navbarStyle = {
  height: "60px",
  backgroundColor: "white",
  borderBottom: "1px solid #e0e0e0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const breadcrumbStyle = {
  fontSize: "14px",
  textTransform: "capitalize",
};

const userInfoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const avatarStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#3498db",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "18px",
};

const userNameStyle = {
  fontSize: "14px",
  fontWeight: "500",
};

const userEmailStyle = {
  fontSize: "12px",
  color: "#666",
};

export default Navbar;
