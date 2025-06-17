import React from "react";

const Sidebar = ({
  navigation,
  currentScreen,
  setCurrentScreen,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-alabaster-200 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-0`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-alabaster-200">
          <h2 className="text-lg font-semibold text-onyx-500">Navigation</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentScreen(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentScreen === item.id
                  ? "bg-tea-green-200 text-onyx-700"
                  : "text-onyx-600 hover:bg-alabaster-100"
              }`}
            >
              <item.icon size={18} className="mr-3" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
