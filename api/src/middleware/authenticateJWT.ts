import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './JWT';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.substring('Bearer '.length);

  try {
    const payload = verifyToken(token);
    req.user = { userId: payload.userId, role: payload.role };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
