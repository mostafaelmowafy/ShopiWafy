import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
// import Unauthorized from "./pages/Unauthorized"; // لو أنشأتها

// Layout & Protection
import AppLayout from "./AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import OrdersDashboard from "./pages/OrdersDashboard";
import AdminLayout from "./AdminLayout";
import UsersDashboard from "./pages/UsersDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <CartProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Routes>
              {/* Protected Layout for authenticated users */}
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:productId" element={<Product />} />
                <Route path="contact" element={<Contact />} />
                <Route path="cart" element={<Cart />} />
                <Route path="order-confirmation/:orderId" element={<Order />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* Admin-only route */}
              <Route
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="orders" element={<OrdersDashboard />} />
                <Route path="Users" element={<UsersDashboard />} />
              </Route>

              {/* Public routes */}
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>

          {/* Toast notifications */}
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "10px" }}
            toastOptions={{
              success: { duration: 2000 },
              error: { duration: 3000 },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </CartProvider>
  );
}

export default App;
