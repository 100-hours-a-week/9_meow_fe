import { CreatePostForm } from "@/components/pages";

function CreatePostPage() {
  return (
    <CreatePostForm>
      <CreatePostForm.ImageInput />
      <CreatePostForm.PostContentInput />
      <CreatePostForm.SelectEmotion />
    </CreatePostForm>
  );
}

export default CreatePostPage;
