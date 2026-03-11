import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {

    const [revenueResult, totalOrders] = await Promise.all([
      prisma.userPackage.aggregate({
        _sum: {
          paymentAmount: true
        },
        where: {
          status: "ACTIVE"
        }
      }),

      prisma.userPackage.count({
        where: {
          status: "ACTIVE"
        }
      })
    ]);

    const revenue = revenueResult._sum.paymentAmount || 0;

    return NextResponse.json(
      {
        success: true,
        data: {
          revenue,
          totalOrders
        }
      },
      { status: 200 }
    );

  } catch (error) {

    console.error("Dashboard metrics error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load dashboard metrics"
      },
      { status: 500 }
    );
  }
}