import { cn } from "@/lib/utils";

const MAX_LENGTH = 200;
const MIN_LENGTH = 5;

interface IPostContentInput {
  content: string;
  setContent: (content: string) => void;
<<<<<<< HEAD
=======
  setIsSubmitDisabled: (isSubmitDisabled: boolean) => void;
>>>>>>> origin/dev
}

export default function PostContentInput({
  content,
  setContent,
<<<<<<< HEAD
=======
  setIsSubmitDisabled,
>>>>>>> origin/dev
}: IPostContentInput) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
<<<<<<< HEAD
=======
    setIsSubmitDisabled(
      newValue.length < MIN_LENGTH || newValue.length > MAX_LENGTH,
    );
>>>>>>> origin/dev
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <textarea
        className="w-full h-[150px] resize-none outline-foreground border border-foreground/30 rounded-2xl p-2"
        placeholder="글을 입력하세야옹"
        value={content}
        onChange={handleChange}
      />
      <div
        className={cn(
          "text-sm text-right",
          content.length > MAX_LENGTH || content.length < MIN_LENGTH
            ? "text-destructive"
<<<<<<< HEAD
            : "text-foreground/50"
=======
            : "text-foreground/50",
>>>>>>> origin/dev
        )}
      >
        {content.length}/{MAX_LENGTH}
      </div>
    </div>
  );
}
