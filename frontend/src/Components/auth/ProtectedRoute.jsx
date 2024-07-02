/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({ isAllowed, redirectPath, children }) => {
  if (!isAllowed) return <Navigate to={redirectPath} />;

  return children;
};

export default ProtectedRoute;
