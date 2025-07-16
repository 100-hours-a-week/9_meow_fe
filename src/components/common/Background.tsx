export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-[url('/background.png')] bg-cover bg-bottom">
      {children}
    </div>
  );
}
