import { Navigate } from "react-router-dom";

function ProtectedRoute({ loggedIn, children }) {
  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

export default ProtectedRoute;
