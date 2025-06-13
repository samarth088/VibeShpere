export default function Chats() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Messages</h2>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div>
              <h4 className="font-medium">User {i + 1}</h4>
              <p className="text-sm text-gray-500">Last message preview...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
