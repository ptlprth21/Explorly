
'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setError(null);
    setUrl(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setUrl(data.url);
    } catch (err) {
      setError('An error occurred during upload. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = () => {
    if (url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Image Uploader</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Select Image</Label>
              <Input id="file-upload" type="file" onChange={handleFileChange} accept="image/*" />
            </div>
            <Button type="submit" disabled={uploading || !file}>
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          
          {url && (
            <div className="mt-6">
              <p className="font-semibold">Image URL:</p>
              <div className="flex items-center gap-2 p-2 border rounded-md bg-muted">
                <input
                  type="text"
                  value={url}
                  readOnly
                  className="flex-grow bg-transparent outline-none"
                />
                <Button onClick={copyToClipboard} size="icon" variant="ghost">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
