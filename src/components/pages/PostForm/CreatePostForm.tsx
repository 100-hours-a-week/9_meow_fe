import { ReactNode } from "react";
import ImageInput from "./ImageInput";
import PostContentInput from "./PostContentInput";
import SelectEmotion from "./SelectEmotion";
import { Button } from "@/components/ui/button";

export default function CreatePostForm({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 items-center p-5">
      <h1 className="text-3xl font-bold">오늘은 무슨 일이 있었냥</h1>
      {children}
      <div className="flex gap-2 w-full justify-end">
        <Button variant="primarySolid">취소냥</Button>
        <Button variant="secondarySolid">£ 다 적으면 누르라냥!</Button>
      </div>
    </div>
  );
}

CreatePostForm.ImageInput = ImageInput;
CreatePostForm.PostContentInput = PostContentInput;
CreatePostForm.SelectEmotion = SelectEmotion;
