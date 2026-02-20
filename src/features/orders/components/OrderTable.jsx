import { useNavigate } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";
import { useToast } from "../../../contexts/ToastContext";

function OrderTable({ orders, onDelete, onStatusChange }) {
  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  const handleDelete = async (id, orderId) => {
    const confirmed = window.confirm(`¿Eliminar orden #${orderId}?`);

    if (confirmed) {
      try {
        await onDelete(id);
        success("Orden eliminada");
      } catch (error) {
        showError("Error al eliminar la orden");
        console.log(error);
      }
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const statuses = ["pending", "completed", "cancelled"];
    const currentIndex = statuses.indexOf(currentStatus);
    const nexStatus = statuses[(currentIndex + 1) % statuses.length];

    try {
      await onStatusChange(id, nexStatus);
    } catch (error) {
      alert("Error al cambiar el estado");
      console.log(error);
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0,1)",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #dee2e6",
            }}
          >
            <th style={headerStyle}>ID</th>
            <th style={headerStyle}>Cliente</th>
            <th style={headerStyle}>Fecha</th>
            <th style={headerStyle}>Items</th>
            <th style={headerStyle}>Total</th>
            <th style={headerStyle}>Estado</th>
            <th style={headerStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody style={{ color: "#000" }}>
          {orders.map((order) => (
            <tr key={order.id} style={{ borderBottom: "1px solid #dee2e6" }}>
              <td style={cellStyle}>#{order.id}</td>
              <td style={cellStyle}>
                {order.userName || `User ${order.userId}`}
              </td>
              <td style={cellStyle}>
                {new Date(order.date).toLocaleDateString()}
              </td>
              <td style={cellStyle}>{order.items?.length || 0} items</td>
              <td style={cellStyle}>
                <strong>${order.total.toFixed(2)}</strong>
              </td>
              <td style={cellStyle}>
                <button
                  onClick={() => handleStatusChange(order.id, order.status)}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <OrderStatusBadge status={order.status} />
                </button>
              </td>
              <td style={cellStyle}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    style={buttonStyle("#007bff")}
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => navigate(`/orders/${order.id}/edit`)}
                    style={buttonStyle("#28a745")}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(order.id, order.id)}
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

export default OrderTable;
