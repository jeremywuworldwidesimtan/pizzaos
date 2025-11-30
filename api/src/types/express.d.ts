// Extends Express Request interface to include authenticated user info
import { UserRole } from "../entities/User";
import { Request } from "express";

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            userId: number;
            role: UserRole;
        };
    }
}
