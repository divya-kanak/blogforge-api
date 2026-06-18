/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Third Party services
 */
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Helpers
 */
import { formatErrors } from "../helpers/errorFormatter";


/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Generic validation middleware for any Joi schema
 */
const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));
      return res.status(400).json(formatErrors(errors));
    }

    req.body = value; // ✅ cleaned & validated data
    next();
  };

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Middleware to check if request body is empty
 */
const checkEmptyBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json(
      formatErrors({
        field: "body",
        message: "Request body cannot be empty",
      })
    );
  }
  next();
};

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Exporting the middlewares
 */
export { validate, checkEmptyBody };
