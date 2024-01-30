import { Navigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { useAuthContext } from "../../state/auth-context";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuthContext();

  // if (loading) {
  //     return <Loading/>;
  // }

  // if (!user) {
  //     return <Navigate to="/login" replace/>;
  // }

  return children;
};

export default ProtectedRoute;
