import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const [user] = useLocalStorageState({}, "user");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user.token) {
        queryClient.clear();
        navigate("/login");
      }
    },
    [navigate, user, queryClient]
  );

  return children;
}

export default ProtectedRoute;
