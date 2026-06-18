/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Third Party services
 */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Helpers
 */
import { generateUniqueSlug } from "../helpers/utils";
import { formatServerError, formatErrors } from "../helpers/errorFormatter";
import { sendError, sendSuccess } from "../helpers/response";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Prisma Client Instance
 */
const prisma = new PrismaClient();

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Create Post
 */
const create = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId, published } = req.body;

    // ✅ generate slug automatically
    const slug = await generateUniqueSlug(title);

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        authorId,
        published: published ?? false,
      },
    });

    return sendSuccess(res, post, {}, 201, "Post created successfully.");
  } catch (err: any) {
    return sendError(res, formatServerError(), 500, "Internal server error.");
  }
};

/**
 * Author: Indianic -DivyaKanak 
 * Date: 2024-06-20
 * get All Posts (supports filtering, pagination, sorting)
 * Example: /posts?userId=1&published=true&skip=0&take=10&sort=desc
 */
const getAll = async (req: Request, res: Response) => {
  try {
    const { userId, published, skip, take, sort } = req.query;

    const filters: any = {};
    if (userId) filters.authorId = Number(userId);
    if (published) filters.published = published === "true";

    const posts = await prisma.post.findMany({
      where: filters,
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 10,
      orderBy: sort ? { createdAt: sort === "asc" ? "asc" : "desc" } : { createdAt: "desc" },
      include: { author: true },
    });

    return sendSuccess(res, posts, {}, 200, "Posts fetched successfully.");
  } catch (err: any) {
    return sendError(res, formatServerError(), 500, "Internal server error.");
  }
};

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Get Post by ID
 */
const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: Number(id) }
    });
    if (!post) {
      return sendError(res, formatErrors({ field: "id", message: "Post not found." }), 404, "Post not found.");
    }
    return sendSuccess(res, post, {}, 200, "Post fetched successfully.");
  } catch (err: any) {
    return sendError(res, formatServerError(), 500, "Internal server error.");
  }
};  

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Update Post
 */
const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, published, authorId } = req.body;   
    const data: any = {};
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.content = content;
    if (published !== undefined) data.published = published;
    if (authorId !== undefined) data.authorId = authorId;
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data,
    });
    return sendSuccess(res, post, {}, 200, "Post updated successfully.");
  } catch (err: any) {
    return sendError(res, formatServerError(), 500, "Internal server error.");
  }
};

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Delete Post
 */
const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({ where: { id: Number(id) } });    
    return sendSuccess(res, null, {}, 200, "Post deleted successfully.");
  } catch (err: any) {
    return sendError(res, formatServerError(), 500, "Internal server error.");
  }
};

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Export all controller functions
 */
export { create, getAll, getById, update, remove };

