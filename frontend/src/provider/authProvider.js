import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { parseCookies } from "../helper/cookieParser";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const cookies = parseCookies();
  const [credentials, setCredentials] = useState({
    accessToken: cookies.accessToken || "",
    refreshToken: cookies.refreshToken || "",
  });

  const setToken = (newToken, newRefreshToken) => {
    setCredentials({
      accessToken: newToken,
      refreshToken: newRefreshToken,
    });
  };

  const resetToken = () => {
    delete axios.defaults.headers.common["Authorization"];
    document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setCredentials({
      accessToken: "",
      refreshToken: "",
    });
  };

  useEffect(() => {
    if (credentials.accessToken) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + credentials.accessToken;
      document.cookie = `refreshToken=${credentials.refreshToken}; path=/; SameSite=Lax; max-age=86400`;
      document.cookie = `accessToken=${credentials.accessToken}; path=/;  SameSite=Lax; max-age=20`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
      delete document.cookie;
      // new line
    }
  }, [credentials]);

  const contextValue = useMemo(
    () => ({
      credentials,
      setToken,
      resetToken,
    }),
    [credentials]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
