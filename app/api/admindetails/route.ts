import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface CreateAdminBody {
    userId: string;
    username?: string;
    password: string;
}

interface UpdateAdminBody {
    userId: string;
    username?: string;
    password?: string;
}

export async function POST(req: NextRequest) {
    try {
        const body: CreateAdminBody = await req.json();

        const { userId, username, password } = body;

        if (!userId || !password) {
            return NextResponse.json(
                { error: "userId and password are required" },
                { status: 400 }
            );
        }

        const admin = await prisma.adminDetails.create({
            data: {
                userId,
                username,
                password
            }
        });

        return NextResponse.json(
            { success: true, data: admin },
            { status: 201 }
        );

    } catch (err: any) {
        console.error("Create admin error:", err);

        return NextResponse.json(
            { error: err.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body: UpdateAdminBody = await req.json();

        const { userId, username, password } = body;

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        const admin = await prisma.adminDetails.update({
            where: {
                userId
            },
            data: {
                username,
                password
            }
        });

        return NextResponse.json(
            { success: true, data: admin },
            { status: 200 }
        );

    } catch (err: any) {
        console.error("Update admin error:", err);

        return NextResponse.json(
            { error: err.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}