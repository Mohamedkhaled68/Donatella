import React from "react";

const StatisticsCard = ({ title, value, subtitle, icon }) => {
    return (
        <div className="bg-[#27292C] rounded-lg p-6 hover:bg-[#2d2f33] transition-colors">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/60 text-sm font-medium">{title}</h3>
                <span className="text-2xl">{icon}</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{value}</div>
            {subtitle && (
                <div className="text-white/40 text-xs">{subtitle}</div>
            )}
        </div>
    );
};

export default StatisticsCard;



