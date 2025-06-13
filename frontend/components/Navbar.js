export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md flex justify-between items-center px-4 py-2 z-50">
      <h1 className="text-xl font-bold">VibeSphere</h1>
      <div className="flex gap-3">
        <img src="/icons/message.svg" alt="DM" className="w-6 h-6" />
        <img src="/icons/heart.svg" alt="Notifications" className="w-6 h-6" />
        <img src="/icons/user.jpg" alt="Profile" className="w-6 h-6 rounded-full" />
      </div>
    </div>
  );
}
