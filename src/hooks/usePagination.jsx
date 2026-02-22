// src/hooks/usePagination.js
import { useState, useMemo } from "react";

/**
 * Hook reutilizable para manejar paginación
 * @param {Array} items - Array de items a paginar
 * @param {number} initialItemsPerPage - Items por página inicial (default: 10)
 * @returns {Object} Estado y funciones de paginación
 */
function usePagination(items, initialItemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // 🧮 CALCULAR DATOS DE PAGINACIÓN
  const paginationData = useMemo(() => {
    const totalItems = items?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Índices de inicio y fin
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Items de la página actual
    const currentItems = items?.slice(indexOfFirstItem, indexOfLastItem) || [];

    return {
      currentItems,
      totalItems,
      totalPages,
      currentPage,
      itemsPerPage,
      indexOfFirstItem: indexOfFirstItem + 1, // +1 para mostrar "1" en lugar de "0"
      indexOfLastItem: Math.min(indexOfLastItem, totalItems),
    };
  }, [items, currentPage, itemsPerPage]);

  // 📄 CAMBIAR PÁGINA
  const goToPage = (pageNumber) => {
    const page = Math.max(1, Math.min(pageNumber, paginationData.totalPages));
    setCurrentPage(page);
  };

  // ⏮️ PÁGINA ANTERIOR
  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  // ⏭️ PÁGINA SIGUIENTE
  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  // 🔢 CAMBIAR ITEMS POR PÁGINA
  const changeItemsPerPage = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset a primera página
  };

  // 🔄 RESET PAGINACIÓN (útil al aplicar filtros)
  const resetPagination = () => {
    setCurrentPage(1);
  };

  return {
    ...paginationData,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    changeItemsPerPage,
    resetPagination,
  };
}

export default usePagination;
