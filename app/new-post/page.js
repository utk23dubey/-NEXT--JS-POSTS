"use client";
import { FormPost } from "@/components/form-post";
import { createPost } from "@/actions/posts-actions";
export default function NewPostPage() {
  return (
    <>
      <h1>Create a new post</h1>
      <FormPost createPost={createPost} />
    </>
  );
}
