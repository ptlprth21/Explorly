
import { NextRequest, NextResponse } from 'next/server';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Give the file a unique name to prevent overwrites
    const uniqueFileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `uploads/${uniqueFileName}`);

    // Convert the file to a buffer to upload
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, buffer, {
      contentType: file.type,
    });

    // Get the public URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    return NextResponse.json({ url: downloadURL }, { status: 200 });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
