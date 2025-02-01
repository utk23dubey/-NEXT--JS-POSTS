"use client";

import { useFormStatus } from "react-dom";
export function FormSubmit() {
  const status = useFormStatus();

  if (status.pending) {
    return <span>Creating Post.....</span>;
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}
