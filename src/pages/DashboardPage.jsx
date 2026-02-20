import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {/* 👋 BIENVENIDA */}
      <div style={welcomeStyle}>
        <h1>¡Bienvenido, {user?.name}!</h1>
        <p style={{ color: "#666", marginTop: "8px" }}>
          Aquí tienes un resumen de tu sistema
        </p>
      </div>

      {/* 📊 CARDS DE RESUMEN */}
      <div style={cardsContainerStyle}>
        {/* CARD: PRODUCTOS */}
        <div style={cardStyle} onClick={() => navigate("/products")}>
          <div style={cardIconStyle}>📦</div>
          <h3>Productos</h3>
          <p style={{ color: "#666", fontSize: "14px", marginTop: "8px" }}>
            Gestiona tu catálogo
          </p>
          <button style={cardButtonStyle}>Ver productos →</button>
        </div>

        {/* CARD: USUARIOS */}
        <div style={cardStyle} onClick={() => navigate("/users")}>
          <div style={cardIconStyle}>👥</div>
          <h3>Usuarios</h3>
          <p style={{ color: "#666", fontSize: "14px", marginTop: "8px" }}>
            Administra usuarios
          </p>
          <button style={cardButtonStyle}>Ver usuarios →</button>
        </div>

        {/* CARD: PRÓXIMAMENTE */}
        <div style={cardStyle} onClick={() => navigate("/orders")}>
          <div style={cardIconStyle}>📋</div>
          <h3>Órdenes</h3>
          <p style={{ color: "#666", fontSize: "14px", marginTop: "8px" }}>
            Gestiona ordenes
          </p>
          <button style={cardButtonStyle}>Ver ordenes</button>
        </div>

        <div style={{ ...cardStyle, opacity: 0.5, cursor: "not-allowed" }}>
          <div style={cardIconStyle}>📊</div>
          <h3>Reportes</h3>
          <p style={{ color: "#666", fontSize: "14px", marginTop: "8px" }}>
            Próximamente
          </p>
        </div>
      </div>

      {/* 📌 ACCIONES RÁPIDAS */}
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ marginBottom: "16px" }}>Acciones rápidas</h2>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate("/products/new")}
            style={actionButtonStyle("#007bff")}
          >
            + Nuevo Producto
          </button>
          <button
            onClick={() => navigate("/users/new")}
            style={actionButtonStyle("#28a745")}
          >
            + Nuevo Usuario
          </button>
          <button
            onClick={() => navigate("/orders/new")}
            style={actionButtonStyle("#a75928")}
          >
            + Nueva Orden
          </button>
        </div>
      </div>
    </div>
  );
}

// 🎨 ESTILOS
const welcomeStyle = {
  marginBottom: "32px",
  paddingBottom: "20px",
  borderBottom: "2px solid #e0e0e0",
};

const cardsContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "24px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
  ":hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
};

const cardIconStyle = {
  fontSize: "48px",
  marginBottom: "16px",
};

const cardButtonStyle = {
  marginTop: "16px",
  padding: "8px 16px",
  backgroundColor: "#f0f0f0",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  width: "100%",
};

const actionButtonStyle = (color) => ({
  padding: "12px 24px",
  backgroundColor: color,
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
});

export default DashboardPage;
