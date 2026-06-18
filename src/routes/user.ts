/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Third Party services
 */
import { Router, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Validators
 */
import { createUserSchema, updateUserSchema } from "../Validators/userValidator";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Middlewares
 */
import { validate, checkEmptyBody } from "../middlewares/validate";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Helpers
 */
import { formatPrismaUniqueError, formatServerError } from "../helpers/errorFormatter"
import { sendSuccess, sendError } from "../helpers/response";


/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Define Router and Prisma Client
 */
const prisma = new PrismaClient();
const router = Router();

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Create User
 */
router.post("/", checkEmptyBody, validate(createUserSchema), async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await prisma.user.create({
            data: { name, email, password },
        });
        return sendSuccess(res, user, {}, 201, "User created successfully.");
    } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            const fields = (err.meta?.target as string[]) || [];
            return sendError(res, formatPrismaUniqueError(fields), 400, "User creation failed.");
        }
        return sendError(res, formatServerError(), 500, "Internal server error.");
    }
});

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Get All Users
 */
router.get("/", async (_req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            include: { posts: true }, // fetch related posts
        });
        return sendSuccess(res, users, {}, 200, "Users fetched successfully.");
    } catch (err: any) {
        return sendError(res, formatServerError(), 500, "Internal server error.");
    }
});

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Get User by ID
 */
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            include: { posts: true },
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        return sendSuccess(res, user, {}, 200, "User fetched successfully.");
    } catch (err: any) {
        return sendError(res, formatServerError(), 500, "Internal server error.");
    }
});

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Update User
 */
router.put("/:id", checkEmptyBody, validate(updateUserSchema), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        // 🔹 Check if email is already used by another user
        if (email) {
            const existingUser = await prisma.user.findFirst({
                where: {
                    email,
                    NOT: { id: Number(id) }, // exclude current user
                },
            });

            if (existingUser) {
                return sendError(res, formatPrismaUniqueError(["email"]), 400, "User update failed.");
            }
        }

        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, password },
        });
        return sendSuccess(res, user, {}, 200, "User updated successfully.");
    } catch (err: any) {
        return sendError(res, formatServerError(), 500, "Internal server error.");
    }
});

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Delete User
 */
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({ where: { id: Number(id) } });
        return sendSuccess(res, null, {}, 200, "User deleted successfully.");
    } catch (err: any) {
        return sendError(res, formatServerError(), 500, "Internal server error.");
    }
});

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Export Router
 */
export default router;
