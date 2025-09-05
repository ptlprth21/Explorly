import { Review } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StarRating from "@/components/ui/StarRating";
import { Users, MessageSquare } from "lucide-react";

interface AggregatedReviewsProps {
  reviews: Review[];
}

const AggregatedReviews = ({ reviews }: AggregatedReviewsProps) => {
  if (reviews.length === 0) {
    return null;
  }

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
  const recentReviews = reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-headline font-bold">What Travelers Are Saying</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-8 text-center">
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-primary">{averageRating.toFixed(1)}</span>
                    <span className="text-2xl text-muted-foreground">/ 5</span>
                </div>
                <StarRating rating={averageRating} size={24} />
            </div>
            <div className="flex items-center gap-4 text-lg">
                <Users className="w-8 h-8 text-primary" />
                <p><span className="font-bold">{totalReviews}</span> total reviews</p>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentReviews.map(review => (
                 <Card key={review.id} className="bg-background">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <h4 className="font-bold">{review.userName}</h4>
                            <StarRating rating={review.rating} />
                        </div>
                        <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground/80 italic">"{review.comment}"</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AggregatedReviews;
