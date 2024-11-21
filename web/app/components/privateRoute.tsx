import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export function withAuthProtection<T extends object>(
  Component: React.ComponentType<T>
) {
  return function ProtectedRoute(props: T) {
    const navigate = useNavigate();

    useEffect(() => {
      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("@btv-user");

        if (!userData) {
          navigate("/");
        }
      }
    }, [navigate]);

    if (typeof window === "undefined") {
      return null;
    }

    const userData = localStorage.getItem("@btv-user");

    if (!userData) {
      return null;
    }

    return <Component {...props} />;
  };
}
