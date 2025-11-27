import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET(req, { params }) {
  const code = params.code;

  const link = await prisma.link.findUnique({ where: { code } });
  if (!link) {
    return NextResponse.redirect('/', { status: 302 }); // Redirect to homepage if not found
  }

  // Update click count + last clicked time
  await prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date()
    }
  });

  // Redirect user to the actual target URL
  return NextResponse.redirect(link.url, { status: 302 });
}
