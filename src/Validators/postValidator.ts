/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Third Party services
 */
import Joi from "joi";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Create Post Schema
 */
export const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Title is required.",
    "string.min": "Title must be at least {#limit} characters long.",
    "string.max": "Title cannot exceed {#limit} characters.",
    "any.required": "Title is required.",
  }),
  content: Joi.string().min(5).required().messages({
    "string.empty": "Content is required.",
    "string.min": "Content must be at least {#limit} characters long.",
    "any.required": "Content is required.",
  }),
  authorId: Joi.number().integer().positive().required().messages({
    "number.base": "Author ID must be a number.",
    "number.integer": "Author ID must be an integer.",
    "number.positive": "Author ID must be a positive number.",
    "any.required": "Author ID is required.",
  }),
  published: Joi.boolean().optional(),
});

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Update Post Schema
 */
export const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(255).messages({
    "string.empty": "Title is required.",
    "string.min": "Title must be at least {#limit} characters long.",
    "string.max": "Title cannot exceed {#limit} characters.",
    "any.required": "Title is required.",
  }),
  content: Joi.string().min(5).messages({
    "string.empty": "Content is required.",
    "string.min": "Content must be at least {#limit} characters long.",
    "any.required": "Content is required.",
  }),
  authorId: Joi.number().integer().positive().messages({
    "number.base": "Author ID must be a number.",
    "number.integer": "Author ID must be an integer.",
    "number.positive": "Author ID must be a positive number.",
    "any.required": "Author ID is required.",
  }),
  published: Joi.boolean(),
}).min(1).messages({
  "object.min": "At least one field must be provided to update the post.",
});
