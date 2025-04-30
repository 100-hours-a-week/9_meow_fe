import { ReactNode } from "react";
import ImageInput from "./ImageInput";

export default function CreatePostForm({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 items-center pt-5">
      <h1 className="text-3xl font-bold">오늘은 무슨 일이 있었냥</h1>
      {children}
    </div>
  );
}

CreatePostForm.ImageInput = ImageInput;
