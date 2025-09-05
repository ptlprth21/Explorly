import { Package } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Play, MapPin, Star, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface MusicPlayerCardProps {
  package: Package;
}

const MusicPlayerCard = ({ package: pkg }: MusicPlayerCardProps) => {
  const ratingPercentage = (pkg.rating / 5) * 100;

  return (
    <Link href={`/packages/${pkg.id}`} className="group block">
      <div className="bg-card p-4 rounded-lg shadow-lg border border-transparent hover:border-primary transition-all duration-300 ease-in-out transform hover:-translate-y-1">
        <div className="relative aspect-square rounded-md overflow-hidden mb-4">
          <Image
            src={pkg.image}
            alt={pkg.title}
            data-ai-hint="travel landscape"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <Play className="h-12 w-12 text-white/70 group-hover:text-white group-hover:scale-110 transition-all" fill="currentColor" />
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">{pkg.title}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="w-4 h-4" />
            <span>{pkg.destination}</span>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
              <span>Rating</span>
              <span>{pkg.rating.toFixed(1)} / 5.0</span>
            </div>
            <Progress value={ratingPercentage} className="h-1 bg-secondary" />
          </div>
          
          <div className="flex justify-around items-center mt-4 text-muted-foreground">
            <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-accent">
                <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-accent">
                <SkipBack className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 hover:bg-accent/20 hover:text-accent rounded-full">
                <Play className="w-6 h-6" fill="currentColor" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-accent">
                <SkipForward className="w-5 h-5" />
            </Button>
             <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-accent">
                <Star className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MusicPlayerCard;
