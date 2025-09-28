import useUser from "../components/authentication/useUser";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";
import useRole from "../components/authentication/useRole";

function ProtectedRoute({ children, requiredRole = null }) {
  const { isLoading, isAuthenticated } = useUser();
  const { profile, isGetUser } = useRole();
  const userRole = profile?.role;

  // أثناء التحميل أو عدم توفر الدور بعد
  if (isLoading || (isAuthenticated && (isGetUser || userRole === undefined))) {
    return (
      <div className="flex justify-center items-center h-[100vh] bg-gray-50">
        <Spinner />
      </div>
    );
  }

  // لو المستخدم مش مسجل دخول
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // لو المستخدم مسجل لكن مش عنده صلاحية للدور المطلوب
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  // لو كل شيء تمام، اعرض المحتوى
  return children;
}

export default ProtectedRoute;
