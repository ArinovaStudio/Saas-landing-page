import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface CreateSystemBody {
  host: string;
  username: string;
  password: string;
  url?: string;
  ip: string;
  entrytype: string;
  update?: Date;
  userId: string;
}

interface UpdateSystemBody {
  host?: string;
  username?: string;
  password?: string;
  url?: string;
  ip?: string;
  entrytype?: string;
  update?: Date;
  userId: string;
}

/* ---------------- CREATE SYSTEM ---------------- */

export async function POST(req: NextRequest) {
  try {

    const body: CreateSystemBody = await req.json();

    const { host, username, password, url, ip, entrytype, update, userId } = body;

    if (!userId || !host || !username || !password || !ip || !entrytype) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const system = await prisma.system.create({
      data: {
        host,
        username,
        password,
        url,
        ip,
        entrytype,
        update,
        userId
      }
    });

    return NextResponse.json(
      { success: true, data: system },
      { status: 201 }
    );

  } catch (err: any) {

    console.error("Create system error:", err);

    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ---------------- UPDATE SYSTEM ---------------- */

export async function PUT(req: NextRequest) {
  try {

    const body: UpdateSystemBody = await req.json();

    const { host, username, password, url, ip, entrytype, update, userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const data: Partial<UpdateSystemBody> = {};

    if (host !== undefined) data.host = host;
    if (username !== undefined) data.username = username;
    if (password !== undefined) data.password = password;
    if (url !== undefined) data.url = url;
    if (ip !== undefined) data.ip = ip;
    if (entrytype !== undefined) data.entrytype = entrytype;
    if (update !== undefined) data.update = update;

    const system = await prisma.system.update({
      where: {
        userId
      },
      data
    });

    return NextResponse.json(
      { success: true, data: system },
      { status: 200 }
    );

  } catch (err: any) {

    console.error("Update system error:", err);

    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}