/* =========================================================
   TYPES
========================================================= */

export interface Artwork {
  id: string;
  title: string;
  artist: {
    name: string;
  };
  price: string;
  imageUrl: string;
}

export type ChartPoint = {
  date: string;
  purchase: number;
  sale: number;
};

export type AnalyticsSummary = {
  revenue: {
    total: number;
    changePercent: number;
  };
  orders: {
    total: number;
    changePercent: number;
  };
};

export type Timeframe = "weekly" | "monthly" | "yearly";

/* =========================================================
   CHART DATA (SOURCE OF TRUTH)
========================================================= */

export const weeklyData: ChartPoint[] = [
  { date: "Mon", purchase: 52000, sale: 35000 },
  { date: "Tue", purchase: 30000, sale: 48000 },
  { date: "Wed", purchase: 58000, sale: 45000 },
  { date: "Thu", purchase: 42000, sale: 60000 },
  { date: "Fri", purchase: 75000, sale: 62000 },
  { date: "Sat", purchase: 68000, sale: 72000 },
  { date: "Sun", purchase: 54000, sale: 46000 },
];

export const monthlyData: ChartPoint[] = [
  { date: "Week 1", purchase: 180000, sale: 220000 },
  { date: "Week 2", purchase: 240000, sale: 210000 },
  { date: "Week 3", purchase: 200000, sale: 260000 },
  { date: "Week 4", purchase: 280000, sale: 300000 },
];

export const yearlyData: ChartPoint[] = [
  { date: "Jan", purchase: 1200000, sale: 1500000 },
  { date: "Feb", purchase: 1100000, sale: 1400000 },
  { date: "Mar", purchase: 1600000, sale: 1700000 },
  { date: "Apr", purchase: 1500000, sale: 1650000 },
  { date: "May", purchase: 1800000, sale: 2000000 },
  { date: "Jun", purchase: 1700000, sale: 2100000 },
  { date: "Jul", purchase: 1900000, sale: 2200000 },
  { date: "Aug", purchase: 2000000, sale: 2300000 },
  { date: "Sep", purchase: 1850000, sale: 2100000 },
  { date: "Oct", purchase: 2100000, sale: 2400000 },
  { date: "Nov", purchase: 2300000, sale: 2600000 },
  { date: "Dec", purchase: 2500000, sale: 2800000 },
];

/* =========================================================
   DATA MAP (TIMEFRAME → DATA)
========================================================= */

export const chartDataMap: Record<Timeframe, ChartPoint[]> = {
  weekly: weeklyData,
  monthly: monthlyData,
  yearly: yearlyData,
};

export const demoUsers = Array.from({ length: 55 }).map((_, i) => {
  const statuses = ["VIP", "Returning", "New"] as const;

  return {
    id: `usr_${crypto.randomUUID().slice(0, 8)}`,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    createdAt: new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 180
    ).toISOString(),
    totalSpent: Math.floor(Math.random() * 9000) + 500,
    status: statuses[i % statuses.length],
  };
});



/* =========================================================
   SUMMARY DERIVATION (CARDS DATA)
========================================================= */

export function deriveSummaryFromChartData(
  data: ChartPoint[]
): AnalyticsSummary {
  if (!data.length) {
    return {
      revenue: { total: 0, changePercent: 0 },
      orders: { total: 0, changePercent: 0 },
    };
  }

  // Total revenue = sum of sales
  const totalRevenue = data.reduce(
    (sum, item) => sum + item.sale,
    0
  );

  // Fake order count logic (placeholder)
  const totalOrders = Math.round(totalRevenue / 10000);

  // % change = last vs first
  const firstSale = data[0].sale;
  const lastSale = data[data.length - 1].sale;

  const changePercent =
    firstSale === 0
      ? 0
      : ((lastSale - firstSale) / firstSale) * 100;

  return {
    revenue: {
      total: totalRevenue,
      changePercent: Number(changePercent.toFixed(2)),
    },
    orders: {
      total: totalOrders,
      changePercent: Number(changePercent.toFixed(2)),
    },
  };
}

const artists = [
  "Claude Monet",
  "Vincent van Gogh",
  "Pablo Picasso",
  "Leonardo da Vinci",
  "Salvador Dalí",
  "Rembrandt",
];

export const dummyArtworks: Artwork[] = Array.from(
  { length: 72 }, // total artworks
  (_, i) => {
    const index = i + 1;

    return {
      id: index.toString(),
      title: `Artwork ${index}`,
      artist: {
        name: artists[index % artists.length],
      },
      price: `₹${(index * 1200).toLocaleString("en-IN")}`,
      imageUrl: `https://picsum.photos/400/600?random=${index}`,
    };
  }
);

/* =========================================================
   END OF FILE
========================================================= */