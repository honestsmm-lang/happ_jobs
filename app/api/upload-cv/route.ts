import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase";

export async function POST(req: NextRequest) {
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

const safeExt = fileExt && ["pdf", "doc", "docx"].includes(fileExt)
  ? fileExt
  : "pdf";

const fileName = `${crypto.randomUUID()}.${safeExt}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("cvs")
    .upload(fileName, file, {
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
}
