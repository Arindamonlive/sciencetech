// src/assets/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const student = localStorage.getItem("studentDetails");

  if (!student) {
    // If not logged in → go to login page
    return <Navigate to="/" replace />;
  }

  return children;
}
