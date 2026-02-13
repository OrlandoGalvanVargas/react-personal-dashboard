import { useState } from "react";
import orderService from "../services/orderService";
import { useEffect } from "react";

function useOrder(id) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await orderService.getById(id);
      setOrder(data);
    } catch (error) {
      setError(error.message || "Error al obtener la información de la orden");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  return { order, loading, error, refetch: fetchOrder };
}

export default useOrder;
