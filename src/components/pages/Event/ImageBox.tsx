import { cn } from "@/lib/utils";

type TRank = "1st" | "2nd" | "3rd" | "none";

interface IImageBox {
  src: string;
  rank: TRank;
  className?: string;
}

function renderBadge(rank: TRank) {
  switch (rank) {
    case "1st":
      return <img src={"/icon/badge/first-badge.PNG"} alt="first badge" />;
    case "2nd":
      return <img src={"/icon/badge/second-badge.PNG"} alt="second badge" />;
    case "3rd":
      return <img src={"/icon/badge/third-badge.PNG"} alt="third badge" />;
    default:
      return null;
  }
}

export default function ImageBox({ src, rank, className }: IImageBox) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-1 w-[120px] h-[120px]",
        className,
      )}
    >
      <div className="absolute top-1 left-1 w-[20px]">{renderBadge(rank)}</div>
      <div className="w-full h-full rounded-lg overflow-hidden border border-muted-foreground">
        <img src={src} alt="postImage" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
