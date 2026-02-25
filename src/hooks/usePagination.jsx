import { useState, useMemo } from "react";

function usePagination(items, initialItemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const paginationData = useMemo(() => {
    const totalItems = items?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = items?.slice(indexOfFirstItem, indexOfLastItem) || [];

    return {
      currentItems,
      totalItems,
      totalPages,
      currentPage,
      itemsPerPage,
      indexOfFirstItem: indexOfFirstItem + 1,
      indexOfLastItem: Math.min(indexOfLastItem, totalItems),
    };
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (pageNumber) => {
    const page = Math.max(1, Math.min(pageNumber, paginationData.totalPages));
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const changeItemsPerPage = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

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
