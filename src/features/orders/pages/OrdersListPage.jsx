import { useNavigate } from "react-router-dom";
import useOrders from "../hooks/useOrders";
import OrderTable from "../components/OrderTable";

function OrdersListPage() {
  const navigate = useNavigate();
  const { orders, loading, error, refetch, deleteOrder, updateStatus } =
    useOrders();

  if (loading) {
    return (
      <div style={centerStyle}>
        <div>Cargando órdenes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={centerStyle}>
        <div style={{ color: "red" }}>Error: {error}</div>
        <button onClick={refetch}>Reintentar</button>
      </div>
    );
  }

  if (orders?.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <div style={headerContainerStyle}>
          <h1>Órdenes</h1>
        </div>
        <div style={emptyStateStyle}>
          <p>No hay órdenes registradas</p>
          <button
            onClick={() => navigate("/orders/new")}
            style={primaryButtonStyle}
          >
            Crear primera orden
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={headerContainerStyle}>
        <div>
          <h1>Órdenes ({orders.length})</h1>
          <p style={{ color: "#666", fontSize: "14px", marginTop: "4px" }}>
            Gestiona las órdenes de compra
          </p>
        </div>
        <button
          onClick={() => navigate("/orders/new")}
          style={primaryButtonStyle}
        >
          + Nueva Orden
        </button>
      </div>

      <div style={statsContainerStyle}>
        <div style={statCardStyle("#fff3cd")}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {orders?.filter((o) => o.status === "pending").length}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>Pendientes</div>
        </div>

        <div style={statCardStyle("#d4edda")}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {orders?.filter((o) => o.status === "completed").length}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>Completadas</div>
        </div>

        <div style={statCardStyle("#f8d7da")}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {orders?.filter((o) => o.status === "cancelled").length}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>Canceladas</div>
        </div>

        <div style={statCardStyle("#d1ecf1")}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            ${orders?.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>Total Ventas</div>
        </div>
      </div>

      <OrderTable
        orders={orders}
        onDelete={deleteOrder}
        onStatusChange={updateStatus}
      />
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

const statsContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "16px",
  marginBottom: "24px",
};

const statCardStyle = (bgColor) => ({
  backgroundColor: bgColor,
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
});

export default OrdersListPage;
