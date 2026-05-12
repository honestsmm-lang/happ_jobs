import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("cv") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    const originalName = file.name;

    const fileExt = originalName.includes(".")
      ? originalName.split(".").pop()?.toLowerCase()
      : "pdf";

    const safeExt =
      fileExt && ["pdf", "doc", "docx"].includes(fileExt)
        ? fileExt
        : "pdf";

    const fileName = `${crypto.randomUUID()}.${safeExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabaseAdmin.storage
      .from("cvs")
      .upload(fileName, buffer, {
        contentType: "application/octet-stream",
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 400 }
      );
    }

    const { data } = supabaseAdmin.storage
      .from("cvs")
      .getPublicUrl(fileName);

    await supabaseAdmin.from("applications").insert({
      source: "cv_upload",
      cv_file_url: data.publicUrl,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
