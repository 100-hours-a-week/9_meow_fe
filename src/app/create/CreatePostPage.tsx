import { CreatePostForm } from "@/components/pages";

function CreatePostPage() {
  return (
    <CreatePostForm>
      <CreatePostForm.ImageInput />
      <CreatePostForm.PostContentInput />
    </CreatePostForm>
  );
}

export default CreatePostPage;
