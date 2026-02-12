import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import UsersTable from "../components/UsersTable";

function UserListPage() {
  const { users, loading, error, refetch, deleteUser, deleting } = useUsers();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={centerStyle}>
        <div>Cargando usuarios....</div>
      </div>
    );
  }

  if (deleting) {
    return <div style={centerStyle}>Eliminando usuario....</div>;
  }

  if (error) {
    return (
      <div style={centerStyle}>
        <div style={{ color: "red" }}>Error: {error}</div>
        <button onClick={refetch}>Reintentar</button>
      </div>
    );
  }

  if (users?.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <div style={headerContainerStyle}>
          <h1>Usuarios</h1>
        </div>
        <div style={emptyStateStyle}>
          <p>No hay usuario registrados</p>
          <button
            onClick={() => navigate("/users/new")}
            style={primaryButtonStyle}
          >
            Crear Primer usuario
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={headerContainerStyle}>
        <h1>Usuarios ({users?.length})</h1>
        <button
          onClick={() => navigate("/users/new")}
          style={primaryButtonStyle}
        >
          + Nuevo Usuario
        </button>
      </div>

      <UsersTable users={users} onDelete={deleteUser} />
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

const headerContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  paddingBottom: "12px",
  borderBottom: "2px solid #dee2e6",
};

const emptyStateStyle = {
  textAlign: "center",
  padding: "60px 20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

const primaryButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
};

export default UserListPage;
