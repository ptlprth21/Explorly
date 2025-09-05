import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
  size?: number;
}

const StarRating = ({
  rating,
  totalStars = 5,
  className,
  size = 16,
}: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const partialStarFill = Math.round((rating % 1) * 100);

  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`Rating: ${rating} out of ${totalStars} stars`}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        if (starNumber <= fullStars) {
          return <Star key={index} fill="currentColor" className="text-accent" style={{ width: size, height: size }} />;
        }
        if (starNumber === fullStars + 1 && partialStarFill > 0) {
            return (
                <div key={index} className="relative" style={{ width: size, height: size }}>
                    <Star className="text-accent/30" style={{ width: size, height: size }} />
                    <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${partialStarFill}%` }}>
                        <Star fill="currentColor" className="text-accent" style={{ width: size, height: size }} />
                    </div>
                </div>
            )
        }
        return <Star key={index} className="text-accent/30" style={{ width: size, height: size }} />;
      })}
    </div>
  );
};

export default StarRating;
