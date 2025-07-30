import { LazyImage } from "@/components/common";

export interface IPostContent {
  thumbnailUrl: string | null;
  content: string;
}

export default function PostContent({ thumbnailUrl, content }: IPostContent) {
  return (
    <div className="flex flex-col gap-1 w-full pb-1">
      <div className="flex flex-row items-start gap-2">
        <p className="text-sm whitespace-pre-wrap flex-1">{content}</p>
        {thumbnailUrl && (
          <LazyImage
            src={thumbnailUrl}
            alt="썸네일"
            className="w-[120px] h-[120px] rounded-lg object-cover flex-shrink-0"
          />
        )}
      </div>
    </div>
  );
}
