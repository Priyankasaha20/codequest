import React from "react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  iconColor = "text-claret-500",
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-alabaster-200">
      <Icon className={`w-12 h-12 ${iconColor} mb-4`} />
      <h3 className="text-xl font-semibold text-onyx-500 mb-2">{title}</h3>
      <p className="text-onyx-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
