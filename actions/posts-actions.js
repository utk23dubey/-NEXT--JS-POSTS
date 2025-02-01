"use server";
import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
  "use server";
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];

  if (!title || title.length === 0) {
    errors.push("title is required");
  }

  if (!content || content.length === 0) {
    errors.push("content is required");
  }

  if (!image || image.size === 0) {
    errors.push("image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }
  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error("Image Upload Failed , Post cant be created");
  }
  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });
  revalidatePath("/", "layout");
  redirect("/feed");
}

export async function toggleLikeOnPost(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/feed"); //  this functions removes the cache and try to get new data ,takes a  path or list of paths  to revalidate
  //   redirect("/feed");
}
