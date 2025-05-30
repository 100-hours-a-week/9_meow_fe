import { Button } from "../ui/button";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-gradient-to-b from-[#fff7f0] via-[#fcefdc] to-[#f9e8cb]">
      {children}
      <div className="w-[300px] flex-shrink-0 relative hidden md:block bg-transparent mr-auto">
        <div className="flex flex-col items-end justify-center h-full p-6">
          <div className="flex flex-row gap-5 items-center">
            <Button
              variant="ghost"
              className="p-1"
              onClick={() => {
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLScfUhc48SbNaHes8pIwmlDWwWztPRLCDIAmW7eEIgEgI5KLLQ/viewform?usp=dialog",
                  "_blank",
                );
              }}
            >
              <img src="/icon/ask.svg" className="size-12" />
            </Button>
            <Button
              variant="ghost"
              className="p-1"
              onClick={() => {
                window.open(
                  "https://www.instagram.com/meowng_official/?utm_source=ig_web_button_share_sheet",
                  "_blank",
                );
              }}
            >
              <img src="/icon/instagram.svg" className="size-10" />
            </Button>
          </div>
          <div className="h-full flex flex-col text-foreground font-bold text-2xl text-right justify-end">
            <h1 className="text-7xl">미야옹</h1>
            <p className="text-foreground text-3xl">우리만의 동물 시점 SNS</p>
            <img src="/realize_logo.png" alt="귀여운 고양이" className="w-60" />
          </div>
        </div>
      </div>
    </div>
  );
}
