/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Third Party services
 */
import { Router } from "express";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Middlewares & Validators
 */
import { checkEmptyBody, validate } from "../middlewares/validate";
import { createPostSchema, updatePostSchema } from "../Validators/postValidator";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Controllers
 */
import { create, getAll, getById, remove, update } from "../Controllers/postController";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Define Router
 */
const router = Router();

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Create Post
 */
router.post("/", checkEmptyBody, validate(createPostSchema), create);

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Get All Posts (supports filtering, pagination, sorting)
 * Example: /posts?userId=1&published=true&skip=0&take=10&sort=desc
 */
router.get("/", getAll);

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Get Post by ID
 */
router.get("/:id", getById);

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Update Post
 */
router.put("/:id", checkEmptyBody, validate(updatePostSchema), update);

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Delete Post
 */
router.delete("/:id", remove);

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * exporting the router
 */
export default router;
