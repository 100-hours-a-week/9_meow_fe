import { ReactNode } from "react";
import ImageInput from "./ImageInput";

export default function CreatePostForm({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

CreatePostForm.ImageInput = ImageInput;
