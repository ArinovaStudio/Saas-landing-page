import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Timeframe } from "@/lib/dummydata";

interface Props {
  title: string;
  icon: React.ReactNode;
  val: string;
  rates: string;
  isUp?: boolean;
  timeframe: Timeframe;
  onTimeframeChange: (value: Timeframe) => void;
  iconBgClass?: string;
  iconColorClass?: string;
}

export function AnalyticCard({
  title,
  icon,
  val,
  rates,
  isUp = true,
  timeframe,
  onTimeframeChange,
  iconBgClass,
  iconColorClass,
}: Props) {
  return (
    <div className="w-full bg-[#ffffff] max-w-87.5 h-44 mb-3 rounded-2xl p-6 flex flex-col justify-between shadow-sm border border-orange-50/50">
      
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <p className="text-[15px] font-medium text-gray-500/80">{title}</p>

        {/* ✅ FILTER STAYS HERE */}
        <Select
          value={timeframe}
          onValueChange={(v) => onTimeframeChange(v as Timeframe)}
        >
          <SelectTrigger className="w-28 h-9 rounded-xl text-gray-800 font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="text-black bg-gray-100" value="weekly">Weekly</SelectItem>
            <SelectItem className="text-black bg-gray-100" value="monthly">Monthly</SelectItem>
            <SelectItem className="text-black bg-gray-100" value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bottom */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full",
              iconBgClass,
              iconColorClass
            )}
          >
            {icon}
          </div>

          <h2 className="text-4xl font-bold text-[#1A1A1A] leading-none">
            {val}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm font-bold">
          {isUp ? (
            <TrendingUp className="text-emerald-500" />
          ) : (
            <TrendingDown className="text-rose-500" />
          )}
          <span className={isUp ? "text-emerald-500" : "text-rose-500"}>
            {rates}%
          </span>
          <span className="text-gray-400 font-medium">
            vs last period
          </span>
        </div>
      </div>
    </div>
  );
}
