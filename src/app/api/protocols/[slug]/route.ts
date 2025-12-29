import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProtocolModel from "@/lib/models/protocols";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params; 

  await dbConnect();

  const protocol = await ProtocolModel.findOne({ slug }).lean();

  if (!protocol) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(protocol);
}
