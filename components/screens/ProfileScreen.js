"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

const ProfileScreen = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  if (!session) {
    return null; // Should be redirected by useEffect
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-tea-green-300 rounded-full flex items-center justify-center mb-4">
          <User size={48} className="text-onyx-600" />
        </div>
        <h1 className="text-2xl font-bold text-onyx-700 mb-2">
          {session.user?.name || "User Profile"}
        </h1>
        <p className="text-onyx-600 mb-6">
          {session.user?.email}
        </p>
        
        <button
          onClick={() => router.push("/profile/view")} // Placeholder for view profile page
          className="w-full bg-claret-500 hover:bg-claret-600 text-white font-semibold py-2 px-4 rounded-lg mb-3 flex items-center justify-center"
        >
          <User size={18} className="mr-2" />
          View Profile
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-onyx-500 hover:bg-onyx-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
