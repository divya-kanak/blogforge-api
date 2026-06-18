/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Main entry point of the application
 */

import express from "express";
import dotenv from "dotenv";

/**  
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Routes
*/
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Middlewares
 */
import { notFoundHandler, errorHandler } from "./middlewares/fallback";


/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Express App Initialization
 */
const app = express();

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Middleware
 */
app.use(express.json());

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Load environment variables
 */
dotenv.config();

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Routes
 */
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Fallback Middlewares
 */
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Start Server
 */
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
app.listen(3000, () => {
  console.log(`🚀 Your Server running at http://${HOST}:${PORT}`);
});
