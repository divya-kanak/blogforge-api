/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Format errors for consistent API responses
 */
interface FormattedError {
  field: string;
  message: string;
}

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Format errors consistently for frontend consumption
 * @param errors Single error or array of errors
 */
export const formatErrors = (
  errors: { field: string; message: string } | { field: string; message: string }[]
) => {
  return {
    errors: Array.isArray(errors) ? errors : [errors],
  };
};

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Helper for Prisma unique constraint error
 */
export const formatPrismaUniqueError = (fields: string[]) => {
  return formatErrors(
    fields.map((field) => ({
      field,
      message: `${field} must be unique.`,
    }))
  );
};

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Helper for unexpected server errors
 */
export const formatServerError = (message = "Internal Server Error.") => {
  return formatErrors({
    field: "server",
    message,
  });
};
