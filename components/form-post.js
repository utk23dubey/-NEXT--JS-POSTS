"use client";

import { useFormState } from "react-dom";
import { FormSubmit } from "./form-submit";

export function FormPost({ createPost }) {
  const [state, formAction] = useFormState(createPost, {});
  return (
    <>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>

        {state.errors &&
          state.errors.map((error) => <p key={error}>{error}</p>)}
      </form>
    </>
  );
}
