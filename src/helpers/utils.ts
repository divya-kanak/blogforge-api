/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Third Party services
 */
import slugify from "slugify";
import { PrismaClient } from "@prisma/client";

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Prisma Client Initialization
 */
const prisma = new PrismaClient();

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * Generate a unique slug for a given title
 * Converts title into SEO-friendly slug
 * Ensures uniqueness by checking DB
 * If exists, appends -1, -2, etc.
 */
const generateUniqueSlug = async (title: string): Promise<string> => {
  try {
    if (!title)
      throw new Error("Title is required for slug generation.");

    // base slug
    let baseSlug = slugify(title, {
      lower: true,
      strict: true, // removes special chars
      trim: true,
    });

    let slug = baseSlug;
    let counter = 1;

    // check if slug exists in DB
    while (true) {
      const existingPost = await prisma.post.findUnique({
        where: { slug },
        select: { id: true },
      });

      if (!existingPost) break; // slug is unique, good to use

      // append counter for uniqueness
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  } catch (error) {
    throw new Error(`Error generating slug: ${(error as Error).message}`);
  }
};

/**
 * Author: Indianic -DivyaKanak
 * Date: 2024-06-20
 * ✅ Exporting the helper function
 */
export { generateUniqueSlug };