/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Third Party services
 */
import Joi from "joi";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * User Validator (Joi)
 */
export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters.",
    "any.required": "Name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters.",
    "string.max": "Password must be at most 20 characters.",
  }),
});

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Update User Schema
 */
export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters.",
    "any.required": "Name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters.",
    "string.max": "Password must be at most 20 characters.",
  }),
});
