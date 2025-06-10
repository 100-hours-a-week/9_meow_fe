import { useState } from "react";

type TTab = "post" | "event";

export default function ProfileTab() {
  const [selectedTab, setSelectedTab] = useState<TTab>("post");

  return (
    <div className="w-full flex flex-row">
      <button
        className={`w-full border-b border-foreground ${
          selectedTab === "post"
            ? "border-foreground text-foreground"
            : "border-foreground/30 text-foreground/30"
        }`}
        onClick={() => setSelectedTab("post")}
      >
        게시글
      </button>
      <button
        className={`w-full border-b border-foreground ${
          selectedTab === "event"
            ? "border-foreground text-foreground"
            : "border-foreground/30 text-foreground/30"
        }`}
        onClick={() => setSelectedTab("event")}
      >
        대회 이력
      </button>
    </div>
  );
}
