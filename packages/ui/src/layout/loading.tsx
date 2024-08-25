import LoadingCircle from "../icons/loading-circle";

export default function LayoutLoader() {
  return (
    <div className="flex h-[calc(100vh-16px)] items-center justify-center">
      <LoadingCircle />
    </div>
  );
}
