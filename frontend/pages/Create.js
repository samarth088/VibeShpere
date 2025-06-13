export default function Create() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Caption"
          className="border p-2 rounded-md"
        />
        <input
          type="file"
          className="border p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
