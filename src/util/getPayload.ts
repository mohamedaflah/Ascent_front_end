import jwt from "jsonwebtoken";

interface DecodedToken {
  role: string;
  // Add other properties based on your token structure
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    const decoded: DecodedToken = jwt.verify(
      token,
      import.meta.env.VITE_JWT_EMAIL_VALIDATION_KEY
    ) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
