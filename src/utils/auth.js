import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

export const verifyToken = (token) => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    return decoded;
  } catch (error) {
    return null;
  }
};

export const getContext = (req) => {
  const token = req.headers.authorization;
  const user = verifyToken(token);
  return { userId: user?.userId };
};
