import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

function useUserForm(userID) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const isEditModel = Boolean(userID);

  const saveUser = async (userData) => {
    try {
      setSaving(true);
      setError(null);

      let savedUser;

      if (isEditModel) {
        savedUser = await userService.update(userID, userData);
      } else {
        savedUser = await userService.create(userData);
      }
      navigate("/users");
      return savedUser;
    } catch (error) {
      setError(error.message || "Error al guardar el usuario");
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  return { saving, error, saveUser, isEditModel };
}

export default useUserForm;
