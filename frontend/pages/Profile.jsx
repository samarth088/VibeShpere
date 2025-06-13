export default function Profile() {
  return (
    <div className="p-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold">Your Username</h3>
          <p className="text-sm text-gray-500">email@example.com</p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold mb-2">Your Posts</h4>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-24 rounded-md"></div>
          ))}
        </div>
      </div>
    </div>
  );
    }
