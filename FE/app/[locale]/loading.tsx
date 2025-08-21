import CircularProgress from "@/components/circular-progress";

export default function GenericLoadingPage() {
  return (
    <div className="py-32 flex items-center justify-center flex-col gap-6">
      <CircularProgress className="w-32 h-32 border-t-4" />
    </div>
  );
}
