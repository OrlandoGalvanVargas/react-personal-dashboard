import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
("../pages/DashboardPage");
import PrivateRoute from "./PrivateRoute";
import ProductListPage from "../features/products/pages/ProductListPage";
import ProductDetailPage from "../features/products/pages/ProductDetailPage";
import ProductFormPage from "../features/products/pages/ProductFormPage";
import UserListPage from "../features/users/pages/UserListPage";
import UserDetailPage from "../features/users/pages/UserDetailPage";
import UserFormPage from "../features/users/pages/UserFormPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import OrdersListPage from "../features/orders/pages/OrdersListPage";
import OrderFormPage from "../features/orders/pages/OrderFormPage";
import OrderDetailPage from "../features/orders/pages/OrderDetailPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Cualquiera puede entrar */}
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {/* Ruta privada: Solo usuarios autenticados */}
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/products/:id/edit" element={<ProductFormPage />} />

          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/new" element={<UserFormPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/users/:id/edit" element={<UserFormPage />} />

          <Route path="/orders" element={<OrdersListPage />} />
          <Route path="/orders/new" element={<OrderFormPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/orders/:id/edit" element={<OrderFormPage />} />
        </Route>
        {/* Redirección por defecto: Si entran a "/" -> ir a /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404: Ruta no encontrada */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
