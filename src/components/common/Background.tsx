export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-b from-[#fff7f0] via-[#fcefdc] to-[#f9e8cb]">
      {children}
      <div className="w-[300px] flex-shrink-0 relative hidden md:block bg-transparent">
        <div className="flex flex-col items-end justify-center h-full p-6">
          <div className="flex flex-row gap-5 items-center">
            <img src="/icon/ask.svg" className="w-10 h-10" />
            <img src="/icon/instagram.svg" className="w-8 h-8" />
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
