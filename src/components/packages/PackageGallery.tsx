import { useState } from "react";
import Image from "next/image";

interface PackageGalleryProps {
  images: string[];
  title: string;
}

export default function PackageGallery({ images, title }: PackageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">Photo Gallery</h3>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl aspect-video cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`${title} - Photo ${index + 1}`}
              fill
              quality={85}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 480px) 100vw,
                     (max-width: 768px) 100vw, 
                     (max-width: 1200px) 50vw, 
                     33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt={title}
              width={1200}
              height={800}
              className="w-full h-auto rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
