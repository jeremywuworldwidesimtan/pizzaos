import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../entities/User';

export const authorizeRoles =
  (...allowedRoles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: role "${req.user.role}" is not allowed`,
      });
    }

    return next();
  };
