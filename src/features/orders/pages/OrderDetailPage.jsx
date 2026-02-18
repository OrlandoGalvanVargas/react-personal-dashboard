import { useParams, useNavigate } from "react-router-dom";
import useOrder from "../hooks/useOrder";

function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { order, loading, error, refetch } = useOrder(id);
}
