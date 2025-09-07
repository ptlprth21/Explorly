import Image from 'next/image';

interface TravelerGalleryProps {
  images: string[];
}

const TravelerGallery = ({ images }: TravelerGalleryProps) => {
  if (images.length === 0) {
    return <p className="text-center text-muted-foreground">No traveler photos yet. Be the first to share!</p>;
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {images.map((src, index) => (
        <div key={index} className="break-inside-avoid">
          <Image
            src={src}
            alt={`Traveler photo ${index + 1}`}
            width={500}
            height={400} 
            className="rounded-lg object-cover w-full h-auto"
            data-ai-hint="travel people destination"
          />
        </div>
      ))}
    </div>
  );
};

export default TravelerGallery;
