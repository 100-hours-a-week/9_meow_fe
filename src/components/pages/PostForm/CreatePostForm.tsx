import { useEffect, useState } from "react";
import ImageInput from "./ImageInput";
import PostContentInput from "./PostContentInput";
import SelectEmotion from "./SelectEmotion";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import usePostMutation from "@/hooks/mutations/usePostMutation";
import { useNavigate } from "react-router-dom";
import { useImageUpload } from "@/hooks/useImageUpload";
import { ApiEmotion } from "@/types/Emotion";

export default function CreatePostForm() {
  const navigate = useNavigate();
  const { mutate: postPost, isPending, isSuccess, isError } = usePostMutation();
=======
import { useNavigate } from "react-router-dom";
import { useImageUpload } from "@/hooks/common/useImageUpload";
import { ApiEmotion } from "@/types/Emotion";
import { postQueries } from "@/api/queries/postQueries";
import { useMutation } from "@tanstack/react-query";

export default function CreatePostForm() {
  const navigate = useNavigate();
  const {
    mutate: createPost,
    isPending,
    isSuccess,
    isError,
  } = useMutation({ ...postQueries.create() });
>>>>>>> origin/dev

  const { selectedImages, addImages, removeImage, error } = useImageUpload();
  const [content, setContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<ApiEmotion>(
<<<<<<< HEAD
    ApiEmotion.NONE
  );
=======
    ApiEmotion.NONE,
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleCancel = () => {
    const answer = window.confirm(
      "취소하면 작성한 내용이 사라져요. 그래도 취소하겠냥?",
    );
    if (answer) {
      navigate("/");
    }
  };
  const handlePostSubmit = () => {
    createPost({
      images: selectedImages.map((img) => img.file),
      content,
      emotion: selectedEmotion,
    });
  };
>>>>>>> origin/dev

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
<<<<<<< HEAD
    if (isError) {
      alert("게시글 작성에 실패했어요. 다시 시도해주세요.");
    }
=======
>>>>>>> origin/dev
  }, [isSuccess, isError, navigate]);

  return (
    <div className="flex flex-col gap-4 items-center p-5">
      <h1 className="text-3xl font-bold">오늘은 무슨 일이 있었냥</h1>
      <ImageInput
        selectedImages={selectedImages}
        addImages={addImages}
        removeImage={removeImage}
        error={error}
      />
<<<<<<< HEAD
      <PostContentInput content={content} setContent={setContent} />
=======
      <PostContentInput
        content={content}
        setContent={setContent}
        setIsSubmitDisabled={setIsSubmitDisabled}
      />
>>>>>>> origin/dev
      <SelectEmotion
        selectedEmotion={selectedEmotion}
        setEmotion={setSelectedEmotion}
      />
      <div className="flex gap-2 w-full justify-end">
<<<<<<< HEAD
        <Button variant="primarySolid">취소냥</Button>
        <Button
          variant="secondarySolid"
          disabled={isPending}
          onClick={() =>
            postPost({ images: selectedImages.map((img) => img.file), content })
          }
        >
          {isPending ? "잠시만 기다려주세요냥" : "다 적으면 누르라냥!"}
=======
        <Button variant="primarySolid" onClick={handleCancel}>
          취소냥
        </Button>
        <Button
          variant="secondarySolid"
          disabled={isPending || isSubmitDisabled}
          onClick={handlePostSubmit}
        >
          {isPending ? "잠시만 기다려주세옹" : "다 적으면 누르라냥!"}
>>>>>>> origin/dev
        </Button>
      </div>
    </div>
  );
}
