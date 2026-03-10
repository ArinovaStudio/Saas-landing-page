import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                userCompany: true,
                system: true,
                adminDetails: true,
                userPackages: {
                    include: {
                        package: true
                    }
                }
            }
        });

        return NextResponse.json({ success: true, users });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { name, email, personId, position } = body;

        if (!name || !email || !personId || !position) {
            return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                personId,
                position
            }
        });

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export const DELETE = async (req: NextRequest) => {
    try {
        const id = new URL(req.url).searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        await prisma.user.delete({ where: { id } });

        return NextResponse.json({ success: true, message: "User deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
