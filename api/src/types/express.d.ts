// Extends Express Request interface to include authenticated user info
import { UserRole } from '../entities/User';

declare global {
  namespace Express {
    interface AuthUser {
      userId: number;
      role: UserRole;
    }

    interface Request {
      user?: AuthUser;
    }
  }
}
