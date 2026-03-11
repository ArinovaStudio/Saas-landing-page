"use client";

import React, { useEffect } from "react";
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
  const [customerCount, setCustomerCount] = React.useState<number>(0);
  const [activeCustomers, setActiveCustomers] = React.useState<number>(0);
  const [pendingCustomers, setPendingCustomers] = React.useState<number>(0);
  const [metrics, setMetrics] = React.useState({
    revenue: 0,
    totalOrders: 0
  });
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

  React.useEffect(() => {
    async function loadCustomers() {
      const res = await fetch("/api/user");
      const data = await res.json();

      const users = data.users || [];

      setCustomerCount(users.length);

      setActiveCustomers(
        users.filter((u: any) => u.userPackages?.[0]?.status === "ACTIVE").length
      );

      setPendingCustomers(
        users.filter((u: any) => u.userPackages?.[0]?.status !== "ACTIVE").length
      );
    }

    loadCustomers();
  }, []);

  React.useEffect(() => {
    async function loadMetrics() {
      const res = await fetch("/api/dashboard-metrics", {
        method: "POST"
      });

      const data = await res.json();

      if (data.success) {
        console.log(data.data, "dattt");
      }
    }

    loadMetrics();
  }, []);

  React.useEffect(() => {
    async function loadMetrics() {
      const res = await fetch("/api/dashboard-metrics", {
        method: "POST"
      });

      const data = await res.json();

      if (data.success) {
        setMetrics({
          revenue: Number(data.data.revenue),
          totalOrders: data.data.totalOrders
        });
      }
    }

    loadMetrics();
  }, []);

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
      <div className="mt-3 w-full pt-4 px-3">
        <div className="grid grid-cols-4 gap-6">

          <AnalyticCard
            variant="revenue"
            title="Revenue"
            icon={<ShoppingBasket size={20} />}
            val={`₹${metrics.revenue}`}
            rates="0"
          />

          <AnalyticCard
            title="Customers"
            icon={<Users size={18} />}
            val={String(customerCount)}
            rates="0"
            iconBgClass="bg-purple-200"
            iconColorClass="text-purple-700"
          />

          <AnalyticCard
            variant="status"
            icon={<Package size={20} />}
            active={activeCustomers}
            pending={pendingCustomers}
            val=""
          />

          <AnalyticCard
            title="Orders"
            icon={<ShoppingCart size={18} />}
            val={String(metrics.totalOrders)}
            rates="0"
            iconBgClass="bg-teal-200"
            iconColorClass="text-teal-700"
          />

        </div>


      </div>

      <div className="mt-4">
        <AnalyticChart />
      </div>
    </div>
  );
}
