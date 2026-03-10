import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { host, username, password, url, ip, entrytype, userId } = body;

    const system = await prisma.system.create({
      data: {
        host,
        username,
        password,
        url,
        ip,
        entrytype,
        userId
      }
    });

    return NextResponse.json({
      success: true,
      system
    });

  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};