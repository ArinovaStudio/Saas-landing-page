"use client";

import React from "react";
import { AnalyticCard } from "./AnalyticCard";
import { AnalyticChart } from "./AnalyticChart";
import {
  CalendarDays,
  ClipboardCheck,
  Package,
  ShoppingBasket,
  ShoppingCart,
  Sprout,
  Truck,
  Users,
} from "lucide-react";

import {
  chartDataMap,
  deriveSummaryFromChartData,
  Timeframe,
} from "@/lib/dummydata";

type CardKey = "sales" | "revenue" | "orders" | "customers";

export function AnalyticsSection() {
  // ✅ SEPARATE timeframe PER CARD
  const [cardTimeframes, setCardTimeframes] = React.useState<
    Record<CardKey, Timeframe>
  >({
    sales: "weekly",
    revenue: "weekly",
    orders: "weekly",
    customers: "weekly",
  });

  // const { data, isLoading } = useSWR(
  //     `/api/admin/analytics/revenue?timeframe=${timeframe}`,
  //     fetcher
  // );

  // helper to update ONLY one card
  const updateTimeframe = (key: CardKey, value: Timeframe) => {
    setCardTimeframes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // derive data PER CARD
  const salesSummary = deriveSummaryFromChartData(
    chartDataMap[cardTimeframes.sales]
  );

  const revenueSummary = deriveSummaryFromChartData(
    chartDataMap[cardTimeframes.revenue]
  );

  const ordersSummary = deriveSummaryFromChartData(
    chartDataMap[cardTimeframes.orders]
  );

  const customersSummary = deriveSummaryFromChartData(
    chartDataMap[cardTimeframes.customers]
  );

  return (
    <div className="mt-3 w-full">
      <div className="flex gap-3">
        <div className="grid grid-cols-2 gap-6 w-full">

          <AnalyticCard
            title="Sales"
            icon={<ShoppingBasket size={22} />}
            val={`₹${salesSummary.revenue.total}`}
            rates={Math.abs(salesSummary.revenue.changePercent).toFixed(2)}
            isUp={salesSummary.revenue.changePercent >= 0}
            timeframe={cardTimeframes.sales}
            onTimeframeChange={(v) => updateTimeframe("sales", v)}
            iconBgClass="bg-[#0a74f5]"
            iconColorClass="text-white"
          />

          <AnalyticCard
            title="Revenue"
            icon={<Sprout size={22} />}
            val={`₹${revenueSummary.revenue.total}`}
            rates={Math.abs(revenueSummary.revenue.changePercent).toFixed(2)}
            isUp={revenueSummary.revenue.changePercent >= 0}
            timeframe={cardTimeframes.revenue}
            onTimeframeChange={(v) => updateTimeframe("revenue", v)}
            iconBgClass="bg-[#463996]"
            iconColorClass="text-white"
          />

          <AnalyticCard
            title="Orders"
            icon={<ShoppingCart size={15} />}
            val={ordersSummary.orders.total.toString()}
            rates={Math.abs(ordersSummary.orders.changePercent).toFixed(2)}
            isUp={ordersSummary.orders.changePercent >= 0}
            timeframe={cardTimeframes.orders}
            onTimeframeChange={(v) => updateTimeframe("orders", v)}
            iconBgClass="bg-[#4ccd83]"
            iconColorClass="text-white"
          />

          <AnalyticCard
            title="Customers"
            icon={<Users size={15} />}
            val={customersSummary.orders.total.toString()}
            rates={Math.abs(customersSummary.orders.changePercent).toFixed(2)}
            isUp={customersSummary.orders.changePercent >= 0}
            timeframe={cardTimeframes.customers}
            onTimeframeChange={(v) => updateTimeframe("customers", v)}
            iconBgClass="bg-[#f6bb07]"
            iconColorClass="text-white"
          />
        </div>
        <div className="w-[50%] bg-[#ffffff] rounded-lg pb-8 px-2">
          <div className="px-3 flex items-center justify-between py-2">
            <div>
              <h1 className="text-3xl ">Order</h1>
              <h1 className="text-3xl ">Summery</h1>
            </div>
            <div className="bg-[#FEFEFE] rounded-full p-2 border border-gray-300">
              <CalendarDays className="text-gray-500"/>
            </div>
          </div>
          <div className="mt-6">
            <div className="border mb-2 rounded-xl">
              <div className="flex items-center gap-4 p-4 rounded-lg mx-3 mb-4">
                <div className="bg-[#F5F4FC] rounded-full p-2">
                  <ClipboardCheck className="text-2xl text-[#55516E]"/>
                  </div>
              <div className="">
                <p className="text-gray-500">New Order</p>
                <h1 className="text-xl">547</h1>
              </div>
              </div> 
            </div>
            <div className="border mb-2 rounded-xl">
              <div className="flex items-center gap-4 p-4 rounded-lg mx-3 mb-4">
                <div className="bg-[#DFF9EC] rounded-full p-2">
                  <Package className="text-2xl text-[#6aa78f]"/>
                  </div>
              <div className="">
                <p className="text-gray-500">Packed</p>
                <h1 className="text-xl">457</h1>
              </div>
              </div> 
            </div>
            <div className="border rounded-xl">
              <div className="flex items-center gap-4 p-4 rounded-lg mx-3 mb-4">
                <div className="bg-[#FBF6EB] rounded-full p-2">
                  <Truck className="text-2xl text-[#E5C863]"/>
                  </div>
              <div className="">
                <p className="text-gray-500">Delivered</p>
                <h1 className="text-xl">145</h1>
              </div>
              </div> 
            </div>
          </div>
        </div>
        <div className="w-full"></div>
      </div>

      <div className="mt-4">
        <AnalyticChart />
      </div>
    </div>
  );
}
