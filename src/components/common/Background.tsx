// import { Button } from "../ui/button";
// import AskIcon from "@/assets/icon/ask.svg?react";
// import InstagramIcon from "@/assets/icon/instagram.svg?react";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-gradient-to-b from-[#fff7f0] via-[#fcefdc] to-[#f9e8cb]">
      <img
        src="/AnimalCrossing_sea_background.png"
        alt="background"
        className="w-full object-cover absolute bottom-0 right-0"
      />
      {children}
    </div>
  );
}
