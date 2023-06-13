import { NextResponse } from "next/server";
import Flickr from "flickr-sdk";
import { FlickrResult } from "@/types";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const prisma = new PrismaClient();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "invalid session" });
  }
  if (!search) {
    return NextResponse.json({ error: "no search" });
  }
  const { userId } = session.user;
  await prisma.history.create({
    data: { userId, search },
  });
  const flickr = new Flickr(process.env.FLICKR_KEY);
  const likes = await prisma.like.findMany({ where: { userId } });
  const likesSet = new Set(likes.map(({ imageId }) => imageId));
  const result: FlickrResult = await flickr.photos.search({ text: search });
  const mapped = result.body.photos.photo.map(({ farm, server, id, secret }) => ({
    url: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`,
    id,
    isLiked: likesSet.has(id),
  }));

  return NextResponse.json(mapped);
}
