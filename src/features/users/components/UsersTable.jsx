import { useNavigate } from "react-router-dom";

function UsersTable({ users, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Estas seguro de eliminar ${name}?`);

    if (confirmed) {
      try {
        await onDelete(id);
        alert("Usuario eliminado");
      } catch (error) {
        alert("No es posible eliminar el usuario");
        console.log(error);
      }
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        {/* 🏷️ ENCABEZADOS */}
        <thead>
          <tr
            style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #dee2e6",
              color: "#000",
            }}
          >
            <th style={headerStyle}>ID</th>
            <th style={headerStyle}>Nombre</th>
            <th style={headerStyle}>Email</th>
            <th style={headerStyle}>Telefono</th>
            <th style={headerStyle}>Acciones</th>
          </tr>
        </thead>

        {/* 📋 DATOS */}
        <tbody style={{ color: "#000" }}>
          {users?.map((user, id) => (
            <tr key={id} style={{ borderBottom: "1px solid #dee2e6" }}>
              <td style={cellStyle}>{user.id}</td>
              <td style={cellStyle}>{user.name}</td>
              <td style={cellStyle}>{user.email}</td>
              <td style={cellStyle}>{user.phone || 0}</td>
              <td style={cellStyle}>
                {/* 🔘 BOTONES DE ACCIÓN */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => navigate(`/users/${user.id}`)}
                    style={buttonStyle("#007bff")}
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => navigate(`/users/${user.id}/edit`)}
                    style={buttonStyle("#28a745")}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    style={buttonStyle("#dc3545")}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const headerStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
  fontSize: "14px",
};

const cellStyle = {
  padding: "12px",
  fontSize: "14px",
};

const buttonStyle = (color) => ({
  padding: "6px 12px",
  backgroundColor: color,
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
});

export default UsersTable;
