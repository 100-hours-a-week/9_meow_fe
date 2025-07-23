export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-gradient-to-br from-rose-100 to-yellow-100">
      <picture className="w-full h-full fixed top-0 left-0">
        <source srcSet="/background.webp" media="(min-width: 768px)" />
        <img src="/background.png" alt="background" className="w-full h-full" />
      </picture>
      <div className="bg-white/50 fixed top-0 left-0 w-full h-full" />
      {children}
    </div>
  );
}
