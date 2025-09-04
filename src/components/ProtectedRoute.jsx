import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';
import { ADMIN_UID } from '../config.js';

function ProtectedRoute({ children, adminOnly }) {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly) {
    console.log("Current User UID:", currentUser.uid);
    console.log("Required Admin UID:", ADMIN_UID);
    if (currentUser.uid !== ADMIN_UID) {
      return <Navigate to="/" />;
    }
  }

  return children;
}

export default ProtectedRoute;