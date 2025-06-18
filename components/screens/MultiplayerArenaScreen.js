"use client";
import React, { useState } from "react";
import { Users, UserPlus, LogIn, Crown } from "lucide-react";
import { motion } from "framer-motion";

const demoRooms = [
  {
    id: "room-1",
    name: "LeetCode Warriors",
    participants: 2,
    max: 3,
    isFull: false,
  },
  {
    id: "room-2",
    name: "Algo Masters",
    participants: 3,
    max: 3,
    isFull: true,
  },
  {
    id: "room-3",
    name: "System Design Squad",
    participants: 1,
    max: 3,
    isFull: false,
  },
];

const MultiplayerArenaScreen = () => {
  const [rooms] = useState(demoRooms);
  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="mb-8">
        <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2 flex items-center gap-2">
          <Users className="w-8 h-8 text-claret-500" /> Multiplayer Arena
        </h1>
        <p className="text-onyx-500 montserrat-regular">
          Join a room and compete with others in real-time challenges!
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl montserrat-semibold text-onyx-700">
            Available Rooms
          </h2>
          <button className="btn-primary flex items-center gap-2 px-4 py-2 montserrat-semibold">
            <UserPlus className="w-4 h-4" /> Create Room
          </button>
        </div>
        <div className="space-y-6">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              className={`card animate-fade-in shadow-lg border-2 ${
                room.isFull ? "border-claret-400" : "border-tea-green-300"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 60 }}
            >
              <div className="card-content flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Crown className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-lg montserrat-semibold text-onyx-700">
                      {room.name}
                    </div>
                    <div className="text-xs text-onyx-500">
                      Room ID: {room.id}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-tea-green-600" />
                  <span className="text-sm montserrat-medium text-onyx-700">
                    {room.participants} / {room.max} participants
                  </span>
                  {room.isFull ? (
                    <span className="ml-2 px-2 py-1 bg-claret-100 text-claret-700 rounded text-xs">
                      Full
                    </span>
                  ) : (
                    <button className="btn-primary flex items-center gap-1 px-3 py-1 text-xs montserrat-semibold">
                      <LogIn className="w-4 h-4" /> Join Room
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiplayerArenaScreen;
