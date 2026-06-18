/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Third Party services
 */
import { Request, Response, NextFunction } from "express";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Helpers
 */
import { sendError } from "../helpers/response";
import { formatServerError } from "../helpers/errorFormatter";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 *  404 Handler
 */
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    sendError(res, formatServerError(`Route ${req.method} ${req.originalUrl} not found`), 404);
};

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 *  Generic Error Handler (last middleware)
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err); // optional logging
    sendError(res, formatServerError(err.message), 500, "Internal server error.");
};

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Exporting the middlewares
 */
export { notFoundHandler, errorHandler };
