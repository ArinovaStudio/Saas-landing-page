import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// PURCHASE PACKAGE
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, packageId, transactionId, expiresAt, autoRenew } = body;

    const pkg = await prisma.package.findUnique({ where: { id: packageId } });

    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const userPackage = await prisma.userPackage.create({
      data: {
        userId,
        packageId,
        transactionId: transactionId || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        autoRenew: autoRenew || false,
        status: "ACTIVE",
        paymentAmount: pkg.price,
        paymentCurrency: pkg.currency,
      },
      include: { package: true },
    });

    return NextResponse.json({ success: true, userPackage });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET USER PACKAGES
export async function GET(req: NextRequest) {
  const userId = new URL(req.url).searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "userId missing" }, { status: 400 });

  const userPackages = await prisma.userPackage.findMany({
    where: { userId },
    include: { package: true },
  });

  return NextResponse.json({ success: true, userPackages });
}

// UPDATE USER PACKAGE
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, status, autoRenew, expiresAt } = body;

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const updated = await prisma.userPackage.update({
    where: { id },
    data: {
      status: status || undefined,
      autoRenew: autoRenew ?? undefined,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    },
    include: { package: true },
  });

  return NextResponse.json({ success: true, userPackage: updated });
}