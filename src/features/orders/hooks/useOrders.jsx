import { useState } from "react";
import orderService from "../services/orderService";
import { useEffect } from "react";

function useOrders() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const data = await orderService.getAll(params);
      setOrders(data.data || data);
    } catch (error) {
      setError(error.message || "Error al obtener las ordenes");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      setLoading(true);
      setError(null);

      await orderService.delete(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      return true;
    } catch (error) {
      setError(error.message || "Error al eliminar la orden");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      setError(null);

      await orderService.updateStatus(id, newStatus);
      setOrders((prev) => {
        prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
      });
      return true;
    } catch (error) {
      setError(error.message || "Error al actualizar el status");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    deleteOrder,
    updateStatus,
  };
}

export default useOrders;
