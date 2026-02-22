// src/components/common/Pagination.jsx

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  indexOfFirstItem,
  indexOfLastItem,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) {
  // 🔢 GENERAR NÚMEROS DE PÁGINA A MOSTRAR
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Mostrar máximo 5 números

    if (totalPages <= maxPagesToShow) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar: 1 ... 5 6 7 ... 20
      const leftSiblingIndex = Math.max(currentPage - 1, 1);
      const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        // Cerca del inicio: 1 2 3 4 5 ... 20
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        // Cerca del final: 1 ... 16 17 18 19 20
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // En el medio: 1 ... 8 9 10 ... 20
        pages.push(1);
        pages.push("...");
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null; // No mostrar paginación si solo hay 1 página
  }

  return (
    <div style={containerStyle}>
      {/* 📊 INFO DE RANGO */}
      <div style={infoStyle}>
        Mostrando <strong>{indexOfFirstItem}</strong> -{" "}
        <strong>{indexOfLastItem}</strong> de <strong>{totalItems}</strong>{" "}
        resultados
      </div>

      {/* 🎛️ CONTROLES */}
      <div style={controlsStyle}>
        {/* 🔢 ITEMS POR PÁGINA */}
        <div style={itemsPerPageStyle}>
          <label
            htmlFor="itemsPerPage"
            style={{ marginRight: "8px", fontSize: "14px" }}
          >
            Items por página:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            style={selectStyle}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* 🔘 BOTONES DE NAVEGACIÓN */}
        <div style={buttonsContainerStyle}>
          {/* ⏮️ ANTERIOR */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={buttonStyle(currentPage === 1)}
          >
            ← Anterior
          </button>

          {/* 🔢 NÚMEROS DE PÁGINA */}
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              style={
                page === currentPage
                  ? activePageButtonStyle
                  : page === "..."
                    ? dotsStyle
                    : pageButtonStyle
              }
            >
              {page}
            </button>
          ))}

          {/* ⏭️ SIGUIENTE */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={buttonStyle(currentPage === totalPages)}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}

// 🎨 ESTILOS
const containerStyle = {
  marginTop: "24px",
  padding: "20px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const infoStyle = {
  fontSize: "14px",
  color: "#666",
  marginBottom: "16px",
};

const controlsStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px",
};

const itemsPerPageStyle = {
  display: "flex",
  alignItems: "center",
};

const selectStyle = {
  padding: "8px 12px",
  border: "1px solid #dee2e6",
  borderRadius: "4px",
  fontSize: "14px",
  cursor: "pointer",
};

const buttonsContainerStyle = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
};

const buttonStyle = (disabled) => ({
  padding: "8px 16px",
  backgroundColor: disabled ? "#e9ecef" : "#007bff",
  color: disabled ? "#6c757d" : "white",
  border: "none",
  borderRadius: "4px",
  cursor: disabled ? "not-allowed" : "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "background-color 0.2s",
});

const pageButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "white",
  color: "#007bff",
  border: "1px solid #dee2e6",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  minWidth: "40px",
  transition: "all 0.2s",
};

const activePageButtonStyle = {
  ...pageButtonStyle,
  backgroundColor: "#007bff",
  color: "white",
  border: "1px solid #007bff",
  fontWeight: "bold",
};

const dotsStyle = {
  padding: "8px 12px",
  backgroundColor: "transparent",
  color: "#6c757d",
  border: "none",
  cursor: "default",
  fontSize: "14px",
};

export default Pagination;
