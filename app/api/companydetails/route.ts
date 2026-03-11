import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface CreateCompanyBody {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    companyType?: string;
    userId: string;
}

interface UpdateCompanyBody {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    companyType?: string;
    userId: string;
}


export async function POST(req: NextRequest) {
    try {

        const body: CreateCompanyBody = await req.json();

        const { name, email, phone, address, companyType, userId } = body;

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        const company = await prisma.userCompany.create({
            data: {
                name,
                email,
                phone,
                address,
                companyType,
                userId
            }
        });

        return NextResponse.json(
            { success: true, data: company },
            { status: 201 }
        );

    } catch (err: any) {

        console.error("Create company error:", err);

        return NextResponse.json(
            { error: err.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {

        const body: UpdateCompanyBody = await req.json();

        const { name, email, phone, address, companyType, userId } = body;

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        const data: Partial<UpdateCompanyBody> = {};

        if (name !== undefined) data.name = name;
        if (email !== undefined) data.email = email;
        if (phone !== undefined) data.phone = phone;
        if (address !== undefined) data.address = address;
        if (companyType !== undefined) data.companyType = companyType;

        const company = await prisma.userCompany.updateMany({
            where: {
                userId: userId
            },
            data
        });

        return NextResponse.json(
            { success: true, data: company },
            { status: 200 }
        );

    } catch (err: any) {

        console.error("Update company error:", err);

        return NextResponse.json(
            { error: err.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}