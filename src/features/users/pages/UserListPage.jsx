import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import UsersTable from "../components/UsersTable";
import { useState } from "react";

function UserListPage() {
  const { users, loading, error, refetch, deleteUser, deleting } = useUsers();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers =
    users?.filter((user) => {
      const searchLower = searchTerm.toLowerCase();

      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        (user.phone && user.phone.toString().includes(searchLower)) ||
        (user.area && user.area.toLowerCase().includes(searchLower))
      );
    }) || [];

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
        {searchTerm && (
          <p style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
            Mostrando {filteredUsers.length} de {users.length} resultados
          </p>
        )}
        <button
          onClick={() => navigate("/users/new")}
          style={primaryButtonStyle}
        >
          + Nuevo Usuario
        </button>
      </div>

      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre, email, teléfono o área..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            style={clearButtonStyle}
            title="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {filteredUsers.length > 0 ? (
        <UsersTable users={filteredUsers} onDelete={deleteUser} />
      ) : (
        <div style={noResultsStyle}>
          <p>No se encontraron usuarios con "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm("")}
            style={secondaryButtonStyle}
          >
            Limpiar búsqueda
          </button>
        </div>
      )}
    </div>
  );
}

const searchContainerStyle = {
  position: "relative",
  marginBottom: "20px",
};

const searchInputStyle = {
  width: "100%",
  padding: "12px 40px 12px 16px",
  fontSize: "14px",
  border: "2px solid #e0e0e0",
  borderRadius: "8px",
  outline: "none",
  transition: "border-color 0.2s",
};

const clearButtonStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  fontSize: "18px",
  color: "#999",
  cursor: "pointer",
  padding: "4px",
};

const noResultsStyle = {
  textAlign: "center",
  padding: "60px 20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

const secondaryButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  marginTop: "12px",
};

// ... (estilos anteriores igual)
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
