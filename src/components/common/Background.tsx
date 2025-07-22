export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-[url(./background.png)] bg-cover bg-bottom">
      <div className="bg-white/50 fixed top-0 left-0 w-full h-full" />
      {children}
    </div>
  );
}
