import { useParams, useNavigate } from "react-router-dom";
import useOrder from "../hooks/useOrder";
import OrderStatusBadge from "../components/OrderStatusBadge";

function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { order, loading, error } = useOrder(id);

  if (loading) {
    return <div style={centerStyle}>Cargando orden...</div>;
  }

  if (error) {
    return (
      <div style={centerStyle}>
        <div style={{ color: "red" }}>Error {error}</div>
        <button onClick={() => navigate("/orders")}>Volver a la lista</button>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={centerStyle}>
        <div>Orden no encontrada</div>
        <button onClick={() => navigate("/orders")}>Volver a la lista</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <button onClick={() => navigate("/orders")} style={secondaryButtonStyle}>
        Volver
      </button>

      <div style={cardStyle}>
        <div style={headerStyle}>
          <div>
            <h1>Orden #{order.id}</h1>
            <OrderStatusBadge status={order.status} />
          </div>
          <button
            onClick={() => navigate(`/orders/${id}/edit`)}
            style={primaryButtonStyle}
          >
            Editar
          </button>
        </div>
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Información General</h3>
          <div style={detailsGridStyle}>
            <div style={detailItemStyle}>
              <span style={labelStyle}>Cliente:</span>
              <span>{order.userName || `User ${order.userId}`}</span>
            </div>

            <div style={detailItemStyle}>
              <span style={labelStyle}>Fecha:</span>
              <span>
                {new Date(order.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div style={detailItemStyle}>
              <span style={labelStyle}>Total:</span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#28a745",
                }}
              >
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>
            Productos ({order.items?.length || 0})
          </h3>
          <div style={itemsContainerStyle}>
            {order.items?.map((item, index) => (
              <div key={index} style={itemRowStyle}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                    {item.productName}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    ${item.price} × {item.quantity} unidades
                  </div>
                </div>
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div style={summaryStyle}>
            <div style={summaryRowStyle}>
              <span>Subtotal:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div style={summaryRowStyle}>
              <span>Impuestos (0%):</span>
              <span>$0.00</span>
            </div>
            <div style={{ ...summaryRowStyle, ...totalRowStyle }}>
              <strong>Total:</strong>
              <strong style={{ fontSize: "20px" }}>
                ${order.total.toFixed(2)}
              </strong>
            </div>
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
  alignItems: "flex-start",
  marginBottom: "32px",
  paddingBottom: "16px",
  borderBottom: "2px solid #e9ecef",
};

const sectionStyle = {
  marginBottom: "32px",
};

const sectionTitleStyle = {
  fontSize: "18px",
  marginBottom: "16px",
  color: "#495057",
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

const itemsContainerStyle = {
  border: "1px solid #dee2e6",
  borderRadius: "8px",
  overflow: "hidden",
};

const itemRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  borderBottom: "1px solid #dee2e6",
  backgroundColor: "white",
};

const summaryStyle = {
  marginTop: "16px",
  padding: "16px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

const summaryRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  fontSize: "14px",
};

const totalRowStyle = {
  borderTop: "2px solid #dee2e6",
  marginTop: "8px",
  paddingTop: "12px",
  fontSize: "16px",
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

export default OrderDetailPage;
