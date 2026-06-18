/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Third Party services
 */
import { Response } from "express";

interface ApiResponse {
  success: boolean;
  data?: any;
  errors?: Array<{ field?: string; message: string }>;
  meta?: object;
  message?: string;
}

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Send Success Response (for create, list, detail, update — all same format)
 */
export const sendSuccess = (
  res: Response,
  data: any,
  meta: object = {},
  statusCode: number = 200,
  message: string = "Request successful."
) => {
  const response: ApiResponse = {
    success: true,
    data,
    ...(Object.keys(meta).length > 0 && { meta }),
    ...(message && { message }),
  };
  return res.status(statusCode).json(response);
};

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Send Error Response (validation, unique constraint, not found, etc.)
 */
export const sendError = (
  res: Response,
  errors: { errors: { field?: string; message: string }[] } | string,
  statusCode: number = 400,
  message: string = "Request failed."
) => {
  const response: ApiResponse = {
    success: false,
    errors: typeof errors === "string" ? [{ message: errors }] : errors.errors,
    ...(message && { message }),
  };
  return res.status(statusCode).json(response);
};
