import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { AppDataSource } from "../config/database";
import { User, UserRole } from "../entities/User";
import { signToken } from "../middleware/JWT";

const userRepo = () => AppDataSource.getRepository(User);

// POST /auth/login
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string; password: string };

    const user = await userRepo().findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordOk = await bcrypt.compare(password, user.password_hash);
    if (!passwordOk) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken({ userId: user.id, role: user.role });

    res.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    });
};

// POST /auth/create-user (admin only)
export const createUser = async (req: Request, res: Response) => {
    const { email, password, role } = req.body as {
        email: string;
        password: string;
        role?: UserRole;
    };

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
    }

    const existing = await userRepo().findOne({ where: { email } });
    if (existing) {
        return res
            .status(409)
            .json({ message: "User with that email already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = userRepo().create({
        email,
        password_hash,
        role: role ?? ("staff" as UserRole),
    });

    try {
        const saved = await userRepo().save(newUser);
        return res
            .status(201)
            .json({ id: saved.id, email: saved.email, role: saved.role });
    } catch (err) {
        console.error("createUser error", err);
        return res.status(500).json({ message: "Failed to create user" });
    }
};
