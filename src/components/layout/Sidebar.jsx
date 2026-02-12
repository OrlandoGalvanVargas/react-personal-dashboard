import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside style={sidebarStyle}>
      <div style={logoStyle}>
        <h2>Dashboard</h2>
      </div>

      <nav style={navStyle}>
        <NavLink to="/dashboard" style={({ isActive }) => linkStyle(isActive)}>
          Dashboard
        </NavLink>
        <NavLink to="/users" style={({ isActive }) => linkStyle(isActive)}>
          Usuarios
        </NavLink>

        <div style={dividerStyle}></div>

        <div style={placeholderStyle}>Ordenes (proxímamente)</div>
        <div style={placeholderStyle}>Reportes (próximamente)</div>
        <button onClick={logout} style={logoutButtonStyle}>
          Cerrar Sesión
        </button>
      </nav>
    </aside>
  );
}

const sidebarStyle = {
  width: "250px",
  backgroundColor: "#2c3e50",
  color: "white",
  display: "flex",
  flexDirection: "column",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
};

const logoStyle = {
  padding: "20px",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  textAlign: "center",
};

const navStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "20px 0",
};

// 🔗 FUNCIÓN PARA ESTILOS DE LINKS
const linkStyle = (isActive) => ({
  padding: "12px 20px",
  color: "white",
  textDecoration: "none",
  display: "block",
  backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
  borderLeft: isActive ? "4px solid #3498db" : "4px solid transparent",
  transition: "all 0.2s",
});

const dividerStyle = {
  height: "1px",
  backgroundColor: "rgba(255,255,255,0.1)",
  margin: "10px 20px",
};

const placeholderStyle = {
  padding: "12px 20px",
  color: "rgba(255,255,255,0.4)",
  fontSize: "14px",
};

const logoutButtonStyle = {
  margin: "20px",
  padding: "12px",
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "bold",
  transition: "background-color 0.2s",
};

export default Sidebar;
