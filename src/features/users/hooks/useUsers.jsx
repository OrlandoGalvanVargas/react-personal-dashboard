import { useState } from "react";
import userService from "../services/userService";
import { useEffect } from "react";

function useUsers() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false); // 👈 Nuevo estado

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await userService.getAll();
      setUsers(data.data || data);
    } catch (error) {
      setError(error?.message || "Error al obtener los usuarios");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setDeleting(true);
      setError(null);

      await userService.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return true;
    } catch (error) {
      setError(error.message || "Error al eliminar el usuario");
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: fetchUsuarios,
    deleteUser,
    deleting,
  };
}

export default useUsers;
