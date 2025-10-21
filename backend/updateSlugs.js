import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Post from "./models/post.js";

// Helper: Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .trim();
};

const updateSlugs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // First, add slugs to posts without them or with null/empty slugs
    const postsWithoutSlugs = await Post.find({
      $or: [
        { slug: { $exists: false } },
        { slug: null },
        { slug: "" }
      ]
    });
    console.log(`Found ${postsWithoutSlugs.length} posts without valid slugs`);

    for (const post of postsWithoutSlugs) {
      const slug = generateSlug(post.title);
      post.slug = slug;
      await post.save();
      console.log(`Added slug "${slug}" to post "${post.title}"`);
    }

    // Then, fix slugs that have leading/trailing hyphens
    const postsWithBadSlugs = await Post.find({ slug: { $regex: /^-|-$/ } });
    console.log(`Found ${postsWithBadSlugs.length} posts with bad slugs`);

    for (const post of postsWithBadSlugs) {
      const fixedSlug = generateSlug(post.title);
      post.slug = fixedSlug;
      await post.save();
      console.log(`Fixed slug from "${post.slug}" to "${fixedSlug}" for post "${post.title}"`);
    }

    console.log("✅ All posts updated with proper slugs");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating slugs:", error);
    process.exit(1);
  }
};

updateSlugs();
