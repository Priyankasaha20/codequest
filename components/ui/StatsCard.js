import React from "react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-tea-green-500",
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-alabaster-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-onyx-600">{title}</p>
          <p className="text-2xl font-bold text-claret-500">{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
    </div>
  );
};

export default StatsCard;
