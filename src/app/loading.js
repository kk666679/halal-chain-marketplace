export default function Loading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-emerald-500"></div>
        <h2 className="text-xl font-semibold text-emerald-700">Loading...</h2>
        <p className="text-sm text-gray-500">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
}