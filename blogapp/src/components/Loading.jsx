
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-solid"></div>
        <p className="ml-4 text-xl font-semibold">Loading...</p>
      </div>
    </div>
  );
}
