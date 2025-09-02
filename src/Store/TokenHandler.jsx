// TokenHandler.jsx
import { useEffect } from "react";
import { useAuth } from "./auth";

const TokenHandler = () => {
  const { storeTokenInLS } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      storeTokenInLS(token);

      // Remove token from the URL
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  return null;
};

export default TokenHandler;
