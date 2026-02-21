import { useNavigate } from "react-router-dom";
import useOrders from "../hooks/useOrders";
import OrderTable from "../components/OrderTable";
import { useState } from "react";

function OrdersListPage() {
  const navigate = useNavigate();
  const { orders, loading, error, refetch, deleteOrder, updateStatus } =
    useOrders();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  const filteredOrders =
    orders
      ?.filter((order) => {
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          const matchesSearch =
            order.id.toString().includes(searchLower) ||
            (order.userName &&
              order.userName.toLowerCase().includes(searchLower)) ||
            order.total.toString().includes(searchLower);

          if (!matchesSearch) return false;
        }

        if (statusFilter !== "all" && order.status !== statusFilter) {
          return false;
        }
        return true;
      })
      ?.sort((a, b) => {
        switch (sortBy) {
          case "date-des":
            return new Date(b.date) - new Date(a.date);
          case "date-asc":
            return new Date(a.date) - new Date(b.date);
          case "total-desc":
            return b.total - a.total;
          default:
            return 0;
        }
      }) || [];

  const stats = {
    all: orders?.length || 0,
    pending: orders?.filter((o) => o.status === "pending").length || 0,
    completed: orders?.filter((o) => o.status === "completed").length || 0,
    cancelled: orders?.filter((o) => o.status === "cancelled").length || 0,
  };

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
      {/* 🏷️ HEADER */}
      <div style={headerContainerStyle}>
        <div>
          <h1>Órdenes ({orders.length})</h1>
          {(searchTerm || statusFilter !== "all") && (
            <p style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
              Mostrando {filteredOrders.length} de {orders.length} resultados
            </p>
          )}
        </div>
        <button
          onClick={() => navigate("/orders/new")}
          style={primaryButtonStyle}
        >
          + Nueva Orden
        </button>
      </div>

      {/* 🎛️ CONTROLES DE FILTRADO */}
      <div style={filtersContainerStyle}>
        {/* 🔍 BÚSQUEDA */}
        <div style={{ flex: 2, position: "relative" }}>
          <input
            type="text"
            placeholder="🔍 Buscar por ID, cliente o total..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} style={clearButtonStyle}>
              ✕
            </button>
          )}
        </div>

        {/* 📊 FILTRO POR ESTADO */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="all">Todos los estados ({stats.all})</option>
          <option value="pending">Pendientes ({stats.pending})</option>
          <option value="completed">Completadas ({stats.completed})</option>
          <option value="cancelled">Canceladas ({stats.cancelled})</option>
        </select>

        {/* 🔢 ORDENAMIENTO */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={selectStyle}
        >
          <option value="date-desc">Fecha: Más reciente</option>
          <option value="date-asc">Fecha: Más antigua</option>
          <option value="total-desc">Total: Mayor a menor</option>
          <option value="total-asc">Total: Menor a mayor</option>
        </select>

        {/* 🧹 LIMPIAR FILTROS */}
        {(searchTerm || statusFilter !== "all" || sortBy !== "date-desc") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setSortBy("date-desc");
            }}
            style={clearAllButtonStyle}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* 📊 ESTADÍSTICAS */}
      <div style={statsContainerStyle}>
        <div style={statCardStyle("#fff3cd")}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {stats.pending}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>Pendientes</div>
        </div>

        <div style={statCardStyle("#d4edda")}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {stats.completed}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>Completadas</div>
        </div>

        <div style={statCardStyle("#f8d7da")}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {stats.cancelled}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>Canceladas</div>
        </div>

        <div style={statCardStyle("#d1ecf1")}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            ${filteredOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>Total Filtrado</div>
        </div>
      </div>

      {/* 📋 TABLA */}
      {filteredOrders.length > 0 ? (
        <OrderTable
          orders={filteredOrders}
          onDelete={deleteOrder}
          onStatusChange={updateStatus}
        />
      ) : (
        <div style={noResultsStyle}>
          <p>No se encontraron órdenes con los filtros aplicados</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
            style={secondaryButtonStyle}
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}

// 🎨 ESTILOS
const filtersContainerStyle = {
  display: "flex",
  gap: "12px",
  marginBottom: "24px",
  flexWrap: "wrap",
};

const searchInputStyle = {
  width: "100%",
  padding: "12px 40px 12px 16px",
  fontSize: "14px",
  border: "2px solid #e0e0e0",
  borderRadius: "8px",
  outline: "none",
};

const selectStyle = {
  flex: 1,
  minWidth: "180px",
  padding: "12px 16px",
  fontSize: "14px",
  border: "2px solid #e0e0e0",
  borderRadius: "8px",
  outline: "none",
  backgroundColor: "white",
  cursor: "pointer",
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

const clearAllButtonStyle = {
  padding: "12px 20px",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  whiteSpace: "nowrap",
};

const noResultsStyle = {
  textAlign: "center",
  padding: "60px 20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

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
