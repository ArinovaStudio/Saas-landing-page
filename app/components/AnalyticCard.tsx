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

// interface Props {
//   title: string;
//   icon: React.ReactNode;
//   val: string;
//   rates: string;
//   isUp?: boolean;
//   timeframe: Timeframe;
//   onTimeframeChange: (value: Timeframe) => void;
//   iconBgClass?: string;
//   iconColorClass?: string;
// }


interface Props {
  title?: string;
  icon: React.ReactNode;
  val: string;
  rates?: string;
  isUp?: boolean;
  timeframe?: Timeframe;
  onTimeframeChange?: (value: Timeframe) => void;
  iconBgClass?: string;
  iconColorClass?: string;
  variant?: "revenue" | "default" | "status";
  active?: number;
  pending?: number;
}


// export function AnalyticCard({
//   title,
//   icon,
//   val,
//   rates,
//   isUp = true,
//   timeframe,
//   onTimeframeChange,
//   iconBgClass,
//   iconColorClass,
// }: Props) {
//   return (
//     <div className="w-full bg-[#ffffff] max-w-87.5 h-44 mb-3 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
      
//       {/* Top Row */}
//       <div className="flex items-start justify-between">
//         <p className="text-[15px] font-medium text-gray-500/80">{title}</p>

//         {/* ✅ FILTER STAYS HERE */}
//         <Select
//           value={timeframe}
//           onValueChange={(v) => onTimeframeChange(v as Timeframe)}
//         >
//           <SelectTrigger className="w-28 h-9 rounded-xl text-gray-800 font-medium">
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem className="text-black bg-gray-100" value="weekly">Weekly</SelectItem>
//             <SelectItem className="text-black bg-gray-100" value="monthly">Monthly</SelectItem>
//             <SelectItem className="text-black bg-gray-100" value="yearly">Yearly</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Bottom */}
//       <div className="space-y-1">
//         <div className="flex items-center gap-3">
//           <div
//             className={cn(
//               "w-8 h-8 flex items-center justify-center rounded-full",
//               iconBgClass,
//               iconColorClass
//             )}
//           >
//             {icon}
//           </div>

//           <h2 className="text-4xl font-bold text-[#1A1A1A] leading-none">
//             {val}
//           </h2>
//         </div>

//         <div className="flex items-center gap-2 text-sm font-bold">
//           {isUp ? (
//             <TrendingUp className="text-emerald-500" />
//           ) : (
//             <TrendingDown className="text-rose-500" />
//           )}
//           <span className={isUp ? "text-emerald-500" : "text-rose-500"}>
//             {rates}%
//           </span>
//           <span className="text-gray-400 font-medium">
//             vs last period
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  variant = "default",
  active,
  pending
}: Props) {

  if (variant === "revenue") {
    return (
      <div className="w-full h-40 rounded-2xl p-6 flex flex-col justify-between shadow-sm bg-gradient-to-r from-[#dbeafe] to-[#bfdbfe]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-200 flex items-center justify-center">
            {icon}
          </div>
          <p className="text-gray-600 font-medium">{title}</p>
        </div>

        <h2 className="text-4xl font-bold text-blue-700">{val}</h2>

        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="text-green-500"/>
          <span className="text-green-500">{rates}%</span>
          <span className="text-gray-500">vs last period</span>
        </div>
      </div>
    )
  }

  if (variant === "status") {
  return (
    <div className="w-full h-40 rounded-2xl overflow-hidden shadow-sm flex">

      {/* ACTIVE SIDE */}
      <div className="flex-1 bg-gradient-to-r from-[#bfe9d5] to-[#a8dfc7] p-6 flex flex-col justify-between">

        <div className="w-12 h-12 rounded-xl bg-[#9fd9bf] flex items-center justify-center text-[#1b7a5a]">
          {React.cloneElement(icon as React.ReactElement, { size: 25 })}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold text-[#1b7a5a]">{active}</h2>

            <span className="px-2 py-[2px] text-xs rounded-md bg-[#8fd3b8] text-[#1b7a5a] font-medium">
              Active
            </span>
          </div>

          {/* <div className="mt-3 h-1.5 w-full bg-[#9fd9bf] rounded-full overflow-hidden">
            <div className="h-full w-[80%] bg-[#2ea56f] rounded-full"></div>
          </div> */}
        </div>

      </div>


      {/* PENDING SIDE */}
      <div className="flex-1 bg-gradient-to-r from-[#f0dfb9] to-[#e6d3a4] p-6 flex flex-col justify-between">

        <div className="w-12 h-12 rounded-xl bg-[#e6c97a] flex items-center justify-center text-[#9b6b07] relative">
          {React.cloneElement(icon as React.ReactElement, { size: 25 })}

          {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#d39c2c] rounded-full"></span> */}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold text-[#9b6b07]">{pending}</h2>

            <span className="px-2 py-[2px] text-xs rounded-md bg-[#e9c979] text-[#9b6b07] font-medium">
              Pending
            </span>
          </div>

          {/* <div className="mt-3 h-1.5 w-full bg-[#e6c97a] rounded-full overflow-hidden">
            <div className="h-full w-[35%] bg-[#d39c2c] rounded-full"></div>
          </div> */}
        </div>

      </div>

    </div>
  );
}

  return (
    <div className="w-full bg-white h-40 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          iconBgClass,
          iconColorClass
        )}>
          {icon}
        </div>

        <p className="text-gray-600 font-medium">{title}</p>
      </div>

      <h2 className="text-4xl font-bold text-gray-900">{val}</h2>

      <div className="flex items-center gap-2 text-sm">
        {isUp ? (
          <TrendingUp className="text-green-500"/>
        ) : (
          <TrendingDown className="text-red-500"/>
        )}

        <span className={isUp ? "text-green-500" : "text-red-500"}>
          {rates}%
        </span>

        <span className="text-gray-500">vs last period</span>
      </div>
    </div>
  )
}
