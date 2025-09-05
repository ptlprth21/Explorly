import { Package } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Clock, Mountain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StarRating from "../ui/StarRating";
import { slugify } from "@/lib/utils";

interface PackageCardProps {
  package: Package;
}

const PackageCard = ({ package: pkg }: PackageCardProps) => {
  return (
    <Link href={`/packages/${pkg.id}`} className="group block">
      <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={pkg.image}
            alt={pkg.title}
            data-ai-hint="travel landscape"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{pkg.type}</Badge>
            <div className="flex items-center gap-2">
              <StarRating rating={pkg.rating} />
              <span className="text-xs text-muted-foreground">({pkg.reviewCount})</span>
            </div>
          </div>
          <h3 className="font-bold text-lg mt-2 group-hover:text-primary transition-colors">{pkg.title}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="w-4 h-4" />
            <span>{pkg.destination}, <Link href={`/country/${slugify(pkg.country)}`} className="inline-block hover:text-primary hover:underline" onClick={(e) => e.stopPropagation()}>{pkg.country}</Link></span>
          </div>

          <div className="mt-4 pt-4 border-t border-border/50 flex-grow flex flex-col justify-end">
            <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Mountain className="w-4 h-4" />
                    <span>{pkg.difficulty}</span>
                </div>
            </div>
            <div className="mt-4 text-right">
              <span className="text-sm text-muted-foreground">From </span>
              <span className="text-xl font-bold text-primary">${pkg.price}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
