import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserRole } from '../entities/User';

dotenv.config({path: "../.env"});

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';

export interface JwtPayload {
  userId: number;
  role: UserRole;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
