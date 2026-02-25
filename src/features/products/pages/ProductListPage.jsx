import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductsTable from "../components/ProductsTable";
import { useState } from "react";

function ProductListPage() {
  const navigate = useNavigate();
  const { products, loading, error, refetch, deleteProduct } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts =
    products?.filter((product) => {
      const searchLower = searchTerm.toLowerCase();

      return (
        product.name.toLowerCase().includes(searchLower) ||
        (product.category &&
          product.category.toLowerCase().includes(searchLower)) ||
        (product.description &&
          product.description.toLowerCase().includes(searchLower))
      );
    }) || [];

  if (loading) {
    return (
      <div style={centerStyle}>
        <div>Cargando productos....</div>
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

  if (products?.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <div style={headerContainerStyle}>
          <h1>Productos</h1>
        </div>
        <div style={emptyStateStyle}>
          <p>No hay productos registrados</p>
          <button
            onClick={() => navigate("/products/new")}
            style={primaryButtonStyle}
          >
            Crear Primer producto
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={headerContainerStyle}>
        <div>
          <h1>Productos ({products?.length})</h1>
          {searchTerm && (
            <p style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
              Mostrando {filteredProducts.length} de {products.length}{" "}
              resultados
            </p>
          )}
        </div>
        <button
          onClick={() => navigate("/products/new")}
          style={primaryButtonStyle}
        >
          + Nuevo Producto
        </button>
      </div>

      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre, categoría o descripción..."
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

      {filteredProducts.length > 0 ? (
        <ProductTable products={filteredProducts} onDelete={deleteProduct} />
      ) : (
        <div style={noResultsStyle}>
          <p>No se encontraron productos con "{searchTerm}"</p>
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

export default ProductListPage;
