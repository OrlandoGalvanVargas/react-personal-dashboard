import { useParams, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import useUserForm from "../hooks/useUserForm";
import UserForm from "../components/UserForm";

function UserFormPage() {
  const { id } = useParams();
  const { user, loading } = useUser(id);
  const { saving, error, saveUser, isEditModel } = useUserForm(id);
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    try {
      await saveUser(userData);
    } catch (error) {
      alert("No es posible guardar el usuario");
      console.log(error);
    }
  };

  if (loading && isEditModel) {
    return <div style={centerStyle}>Cargando usuario....</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px" }}>
        {isEditModel ? "Editar Usuario" : "Nuevo Usuario"}
      </h1>

      {error && <div style={errorBoxStyle}>{error}</div>}

      <div style={cardStyle}>
        <UserForm
          initialData={user}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/users")}
          isSubmitting={saving}
        />
      </div>
    </div>
  );
}

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50vh",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "32px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const errorBoxStyle = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "12px",
  borderRadius: "4px",
  marginBottom: "20px",
  border: "1px solid #f5c6cb",
};

export default UserFormPage;
