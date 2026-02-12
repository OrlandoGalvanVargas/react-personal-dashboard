import { useEffect } from "react";
import { useState } from "react";

function UserForm({ initialValue = null, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
  });

  useEffect(() => {
    if (initialValue) {
      setFormData({
        name: initialValue.name || "",
        email: initialValue.email || "",
        phone: initialValue.phone || "",
        area: initialValue.area || "",
      });
    }
  }, [initialValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
      <div style={fieldStyle}>
        <label htmlFor="name" style={labelStyle}>
          Nombre *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          required
          style={inputStyle}
          placeholder="Ej: Laptop Dell XPS 13"
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="email" style={labelStyle}>
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
          required
          style={inputStyle}
          placeholder="ejemplo@gmail.com"
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="phone" style={labelStyle}>
          Telefono
        </label>
        <input
          id="phone"
          name="phone"
          type="number"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
          style={inputStyle}
          placeholder="00-00-00-00"
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="area" style={labelStyle}>
          Área
        </label>
        <input
          id="area"
          name="area"
          type="text"
          value={formData.area}
          onChange={handleChange}
          disabled={isSubmitting}
          style={inputStyle}
          placeholder="Ej: Negocios"
        />
      </div>

      <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={buttonStyle("#007bff", isSubmitting)}
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          style={buttonStyle("#6c757d", isSubmitting)}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

const fieldStyle = {
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "500",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ced4da",
  borderRadius: "4px",
  fontSize: "14px",
};

const buttonStyle = (color, disabled) => ({
  padding: "10px 24px",
  backgroundColor: disabled ? "#ccc" : color,
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: disabled ? "not-allowed" : "pointer",
  fontSize: "14px",
  fontWeight: "500",
});

export default UserForm;
