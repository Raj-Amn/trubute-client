// utils/checkToken.ts
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string | null) => {
  if (!token) return true;

  try {
    const decoded: any = jwtDecode(token);

    if (!decoded.exp) return true;

    const expiry = decoded.exp * 1000; // seconds -> ms
    return Date.now() > expiry;
  } catch (err) {
    return true;
  }
};
