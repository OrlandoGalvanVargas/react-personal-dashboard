import { useState, useEffect } from "react";
import userService from "../../users/services/userService";
import { productService } from "../../products/services/productService";

function OrderForm({ initialData = null, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    userId: "",
    status: "pending",
    items: [],
  });

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, productsData] = await Promise.all([
          userService.getAll(),
          productService.getAll(),
        ]);

        setUsers(usersData.data || usersData);
        setProducts(productsData.data || productsData);
      } catch (error) {
        console.log("Error al cargar datos", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        userId: initialData.userId || "",
        status: initialData.status || "",
        items: initialData.items || [],
      });
    }
  }, [initialData]);

  const handleAddProduct = (e) => {
    const productId = parseInt(e.target.value);
    if (!productId) return;

    const product = products.find((p) => p.id === productId);

    if (!product) return;

    const exists = formData.items.find((item) => item.productId === productId);
    if (exists) {
      alert("Este producto ya está en la orden");
      return;
    }

    const newItem = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
    };

    setFormData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    e.target.value = "";
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: parseInt(newQuantity) }
          : item,
      ),
    }));
  };

  const handleRemoveItem = (productId) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  };

  const calculateTotal = () => {
    return formData.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.userId) {
      alert("Selecciona un usuario");
      return;
    }

    if (formData.items.length === 0) {
      alert("Agrega al menos un producto");
      return;
    }

    onSubmit(formData);
  };

  if (loading) {
    return <div>Cargando formulario...</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
      <div style={fieldStyle}>
        <label htmlFor="userId" style={labelStyle}>
          Cliente *
        </label>
        <select
          id="userId"
          value={formData.userId}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, userId: e.target.value }))
          }
          disabled={isSubmitting}
          required
          style={inputStyle}
        >
          <option value="">Selecciona un cliente</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="status" style={labelStyle}>
          Estado
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, status: e.target.value }))
          }
          disabled={isSubmitting}
          style={inputStyle}
        >
          <option value="pending">Pendiente</option>
          <option value="completed">Completada</option>
          <option value="cancelled">Cancelada</option>
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="products" style={labelStyle}>
          Agregar Productos *
        </label>
        <select
          id="products"
          onChange={handleAddProduct}
          disabled={isSubmitting}
          style={inputStyle}
        >
          <option value="">Selecciona un producto...</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ${product.price}
            </option>
          ))}
        </select>
      </div>

      {formData.items.length > 0 && (
        <div style={{ ...fieldStyle, marginTop: "24px" }}>
          <label style={labelStyle}>Productos en la orden:</label>
          <div style={itemsContainerStyle}>
            {formData.items.map((item) => (
              <div key={item.productId} style={itemRowStyle}>
                <div style={{ flex: 1 }}>
                  <strong>{item.productName}</strong>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    ${item.price} c/u
                  </div>
                </div>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.productId, e.target.value)
                  }
                  disabled={isSubmitting}
                  style={{ width: "60px", padding: "4px" }}
                />

                <div
                  style={{
                    fontWeight: "bold",
                    width: "80px",
                    textAlign: "right",
                  }}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.productId)}
                  disabled={isSubmitting}
                  style={removeButtonStyle}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div style={totalStyle}>
            <strong>Total:</strong>
            <strong style={{ fontSize: "20px" }}>
              ${calculateTotal().toFixed(2)}
            </strong>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
        <button
          type="submit"
          disabled={isSubmitting || formData.items.length === 0}
          style={buttonStyle(
            "#007bff",
            isSubmitting || formData.items.length === 0,
          )}
        >
          {isSubmitting ? "Guardando..." : "Guardar Orden"}
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

const fieldStyle = { marginBottom: "20px" };

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

const itemsContainerStyle = {
  border: "1px solid #dee2e6",
  borderRadius: "4px",
  marginTop: "8px",
};

const itemRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  borderBottom: "1px solid #dee2e6",
  backgroundColor: "white",
};

const removeButtonStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "4px 8px",
  cursor: "pointer",
  fontSize: "14px",
};

const totalStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px",
  backgroundColor: "#f8f9fa",
  borderRadius: "4px",
  marginTop: "8px",
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

export default OrderForm;
