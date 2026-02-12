import React from "react";
import { useState } from "react";
import userService from "../services/userService";
import { useEffect } from "react";

function useUser(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    if (id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await userService.getById(id);
      setUser(data);
    } catch (error) {
      setError(error.message || "Error al obtener el producto");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return { user, loading, error, refetch: fetchUser };
}

export default useUser;
