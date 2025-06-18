import React from "react";
import { Bell, Menu, X, User } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const router = useRouter();
  return (
    <header className="bg-white border-b border-alabaster-200 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-md text-onyx-600 hover:bg-alabaster-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-xl font-bold text-onyx-500 ml-2">PrepPortal</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="w-5 h-5 text-onyx-600 cursor-pointer hover:text-claret-500" />
          <div
            className="w-8 h-8 bg-tea-green-300 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => router.push("/profile")}
            title="Profile"
          >
            <User size={16} className="text-onyx-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
