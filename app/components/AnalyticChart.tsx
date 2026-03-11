"use client";

import * as React from "react";
import { CartesianGrid, XAxis, YAxis, Area, AreaChart } from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/app/components/ui/chart";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";

import {
    weeklyData, monthlyData, yearlyData,
} from "@/lib/dummydata";


/* ---------------- CHART CONFIG ---------------- */
const chartConfig = {
    purchase: { label: "Purchase", color: "#3b82f6" },
    sale: { label: "Sale", color: "#22c55e" },
} satisfies ChartConfig;
/* -------------------------------------------- */

export function AnalyticChart() {
    const [timeframe, setTimeframe] =
        React.useState<"weekly" | "monthly" | "yearly">("weekly");

    // const { data, isLoading } = useSWR(
    //     `/api/admin/analytics/revenue?timeframe=${timeframe}`,
    //     fetcher
    // );

    const dataMap = {
        weekly: weeklyData,
        monthly: monthlyData,
        yearly: yearlyData,
    };

    const data = dataMap[timeframe];

    return (
        <Card className="w-full border-none shadow-sm bg-white rounded-3xl">
            <CardHeader className="flex justify-between px-6 py-6">
                <CardTitle className="text-xl font-bold text-slate-500">
                    Purchase & Sales Report
                </CardTitle>

                <Select
                    value={timeframe}
                    onValueChange={(value) =>
                        setTimeframe(value as "weekly" | "monthly" | "yearly")
                    }
                >
                    <SelectTrigger className="w-32 h-9 rounded-xl font-bold">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="text-black bg-gray-100" value="weekly">Weekly</SelectItem>
                        <SelectItem className="text-black bg-gray-100" value="monthly">Monthly</SelectItem>
                        <SelectItem className="text-black bg-gray-100" value="yearly">Yearly</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent className="pb-6">
                <ChartContainer config={chartConfig} className="h-75 w-full">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(v) => `₹${v / 1000}k`} />

                        <ChartTooltip content={<ChartTooltipContent />} />

                        <Area
                            type="monotone"
                            dataKey="purchase"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="none"
                        />
                        <Area
                            type="monotone"
                            dataKey="sale"
                            stroke="#22c55e"
                            strokeWidth={3}
                            fill="none"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
