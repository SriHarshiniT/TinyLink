import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

export async function POST(req) {
  try {
    const body = await req.json();
    const url = body.url;
    let code = body.code;

    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

    // basic URL validation
    try {
      new URL(url);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    if (code) {
      if (!CODE_REGEX.test(code)) {
        return NextResponse.json({ error: 'Code must match [A-Za-z0-9]{6,8}' }, { status: 400 });
      }
      const existing = await prisma.link.findUnique({ where: { code } });
      if (existing) return NextResponse.json({ error: 'Code exists' }, { status: 409 });
    } else {
      // generate a random code of length 6
      code = Math.random().toString(36).substring(2, 8);
    }

    const created = await prisma.link.create({
      data: { code, url }
    });

    return NextResponse.json(created);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  const links = await prisma.link.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(links);
}
