import Canvas from "./ui/canvas";

export default function Home({
  searchParams: { newLogin },
}: {
  searchParams: Record<string, string>;
}) {
  // if (newLogin) {
  //   return <div>New Login</div>;
  // }
  return (
    <div className="w-full h-dvh flex flex-col">
      <nav className="w-full h-16 border-b border-neutralgrey-400"></nav>
      <Canvas />
    </div>
  );
}
