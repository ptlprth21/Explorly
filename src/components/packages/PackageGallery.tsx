
import Image from 'next/image';

interface PackageGalleryProps {
  images: string[];
  title: string;
}

const PackageGallery = ({ images, title }: PackageGalleryProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">Photo Gallery</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group overflow-hidden rounded-xl aspect-video">
            <Image
              src={image}
              alt={`${title} - Photo ${index + 1}`}
              fill
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-ai-hint="travel landscape"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default PackageGallery;
