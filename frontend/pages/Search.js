export default function Search() {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search users or posts..."
        className="w-full p-2 border rounded-md"
      />
      <div className="mt-4">
        <p className="text-gray-500">Search results will appear here.</p>
      </div>
    </div>
  );
}
