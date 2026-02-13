import { useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../services/orderService";

function useOrderForm(orderId = null) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const isEditMode = Boolean(orderId);

  const saveOrder = async (orderData) => {
    try {
      setSaving(true);
      setError(null);

      const total = orderData.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const dataToSend = {
        ...orderData,
        total,
        date: orderData.date || new Date().toISOString().split("T")[0],
      };

      const savedOrder;

      if (isEditMode) {
        savedOrder = await orderService.update(orderId, dataToSend);
      } else {
        savedOrder = await orderService.create(dataToSend);
      }
      navigate("/orders");
      return savedOrder;
    } catch (error) {
      setError(error.message || "Error al guardar la orden");
      console.log(error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  return {
    saving,
    error,
    saveOrder,
    isEditMode,
  };
}

export default useOrderForm;
