import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
    const links = await prisma.link.findMany();
    return NextResponse.json(links);
}

export async function POST(req) {
    const { url, code } = await req.json();

    const link = await prisma.link.create({
        data: { url, code }
    });

    return NextResponse.json(link);
}
