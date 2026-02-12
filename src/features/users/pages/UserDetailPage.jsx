import { useNavigate, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";

function UserDetailPage() {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);
  const navigate = useNavigate();

  if (loading) {
    return <div style={centerStyle}>Cargando usuario...</div>;
  }

  if (error) {
    return (
      <div style={centerStyle}>
        <div style={{ color: "red" }}>Error: {error}</div>
        <button onClick={() => navigate("/users")}>Volver a la lista</button>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={centerStyle}>
        <div>Usuario no encontrado</div>
        <button onClick={() => navigate("/users")}>Volver a la lista</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate("/users")} style={secondaryButtonStyle}>
        Volver
      </button>

      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1>{user.name}</h1>
          <button
            onClick={() => navigate(`/users/${id}/edit`)}
            style={primaryButtonStyle}
          >
            Editar
          </button>
        </div>

        <div style={detailsGridStyle}>
          <div style={detailItemStyle}>
            <span style={labelStyle}>ID:</span>
            <span>{user.id}</span>
          </div>

          <div style={detailItemStyle}>
            <span style={labelStyle}>Nombre:</span>
            <span>{user.name || "Sin nombre"}</span>
          </div>

          <div style={detailItemStyle}>
            <span style={labelStyle}>Email:</span>
            <span>{user.email || "Sin email"}</span>
          </div>

          <div style={detailItemStyle}>
            <span style={labelStyle}>Telefono:</span>
            <span>{user.phone || "Sin telefono"}</span>
          </div>

          <div style={detailItemStyle}>
            <span style={labelStyle}>Area:</span>
            <span>{user.area || "Sin area"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50vh",
  flexDirection: "column",
  gap: "12px",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "32px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  marginTop: "20px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  paddingBottom: "16px",
  borderBottom: "2px solid #e9ecef",
};

const detailsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};

const detailItemStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle = {
  fontWeight: "bold",
  color: "#6c757d",
  fontSize: "14px",
  textTransform: "uppercase",
};

const primaryButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  ...primaryButtonStyle,
  backgroundColor: "#6c757d",
};

export default UserDetailPage;
