import { useEffect, useState } from "react";
import ImageInput from "./ImageInput";
import PostContentInput from "./PostContentInput";
import SelectEmotion from "./SelectEmotion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useImageUpload } from "@/hooks/common/useImageUpload";
import { ApiEmotion } from "@/types/Emotion";
import { useQuery } from "@tanstack/react-query";
import { postQueries } from "@/api/queries/postQueries";

export default function EditPostForm({ postId }: { postId: number }) {
  const navigate = useNavigate();

  const { data: postData } = useQuery({
    ...postQueries.editInfo({ postId }),
  });

  const { selectedImages, setSelectedImages, addImage, removeImage } =
    useImageUpload();
  const [content, setContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<ApiEmotion>(
    ApiEmotion.NORMAL,
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleCancel = () => {
    const answer = window.confirm(
      "취소하면 작성한 내용이 사라지는데, 그래도 취소하겠냥?",
    );
    if (answer) {
      navigate(`/detail/${postId}`);
    }
  };

  const handlePostSubmit = () => {
    console.log(`submit postId: ${postId}`);
  };

  useEffect(() => {
    if (postData) {
      setSelectedImages(
        postData.imageUrls.map((url) => ({
          file: null,
          preview: url,
        })),
      );
      setSelectedEmotion(postData.emotion);
      setContent(postData.content);
    }
  }, [postData, setSelectedImages, setSelectedEmotion, setContent]);

  return (
    <div className="flex flex-col gap-4 items-center p-5 pb-16">
      <h1 className="text-3xl font-bold">수정해라 냥!</h1>
      <ImageInput
        selectedImages={selectedImages}
        addImage={addImage}
        removeImage={removeImage}
      />
      <PostContentInput
        content={content}
        setContent={setContent}
        setIsSubmitDisabled={setIsSubmitDisabled}
      />
      <SelectEmotion
        selectedEmotion={selectedEmotion}
        setEmotion={setSelectedEmotion}
      />
      <div className="flex gap-2 w-full justify-end">
        <Button variant="primarySolid" onClick={handleCancel}>
          취소냥
        </Button>
        <Button
          variant="secondarySolid"
          disabled={isSubmitDisabled}
          onClick={handlePostSubmit}
        >
          다 적으면 누르라냥!
        </Button>
      </div>
    </div>
  );
}
