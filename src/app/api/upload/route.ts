
// import { NextRequest, NextResponse } from 'next/server';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '@/lib/supabase';

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get('file') as File | null;

//     if (!file) {
//       return NextResponse.json({ error: 'No file provided' }, { status: 400 });
//     }

//     // Give the file a unique name to prevent overwrites
//     const uniqueFileName = `${Date.now()}-${file.name}`;
//     const storageRef = ref(storage, `uploads/${uniqueFileName}`);

//     // Convert the file to a buffer to upload
//     const buffer = Buffer.from(await file.arrayBuffer());

//     // Upload the file to Firebase Storage
//     await uploadBytes(storageRef, buffer, {
//       contentType: file.type,
//     });

//     // Get the public URL of the uploaded file
//     const downloadURL = await getDownloadURL(storageRef);

//     return NextResponse.json({ url: downloadURL }, { status: 200 });
//   } catch (error) {
//     console.error('Upload failed:', error);
//     return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server"; // Usa tu helper

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabase();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Unique file name
    const uniqueFileName = `${Date.now()}-${file.name}`;

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("uploads") // bucket name
      .upload(uniqueFileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error(uploadError);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(uniqueFileName);

    return NextResponse.json(
      {
        url: publicUrlData.publicUrl,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}