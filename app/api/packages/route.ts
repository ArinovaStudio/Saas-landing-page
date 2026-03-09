import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET ALL PACKAGES
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { price: "asc" },
    });

    return NextResponse.json({ success: true, packages });
  } catch (err) {
    console.log(err.message, "this is the main erreo");

    return NextResponse.json(
      { success: false, error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

// CREATE PACKAGE
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, description, price, currency, features, isPopular } = body;

    if (!name || !slug || !price || !features) {
      return NextResponse.json(
        { success: false, error: "Required fields missing" },
        { status: 400 }
      );
    }

    const pkg = await prisma.package.create({
      data: {
        name,
        slug,
        description,
        price,
        currency,
        features,
        isPopular: isPopular || false,
      },
    });

    return NextResponse.json({ success: true, package: pkg }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// UPDATE PACKAGE
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const pkg = await prisma.package.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, package: pkg });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// UPDATE PACKAGE FEATURE
export async function PATCH(req: NextRequest) {
  try {
    console.log("calledd patch");

    const body = await req.json();
    const { packageId, featureName, included } = body;

    if (!packageId || !featureName || typeof included !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // get current package
    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
      select: { features: true }
    });
console.log(pkg, packageId);

    if (!pkg) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    const features = Array.isArray(pkg.features) ? pkg.features : [];

    // update feature
    const updatedFeatures = features.map((f: any) => {
      if (f.name === featureName) {
        return {
          ...f,
          included
        };
      }
      return f;
    });
    console.log("updatedFeatures", updatedFeatures);
    

    // save updated JSON
    const response = await prisma.package.update({
      where: { id: packageId },
      data: {
        features: updatedFeatures
      }
    });
    console.log("response", response);


    return NextResponse.json({
      success: true,
      message: "Feature updated successfully"
    });

  } catch (error) {
    console.error("Feature update error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE PACKAGE (SOFT DELETE)
export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.package.update({
    where: { id },
    data: { isActive: false },
  });

  return NextResponse.json({ success: true, message: "Package deleted" });
}