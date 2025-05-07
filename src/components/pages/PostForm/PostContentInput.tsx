import { cn } from "@/lib/utils";

const MAX_LENGTH = 200;

interface IPostContentInput {
  content: string;
  setContent: (content: string) => void;
}

export default function PostContentInput({
  content,
  setContent,
}: IPostContentInput) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
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
          content.length > MAX_LENGTH
            ? "text-destructive"
            : "text-foreground/50"
        )}
      >
        {content.length}/{MAX_LENGTH}
      </div>
    </div>
  );
}
