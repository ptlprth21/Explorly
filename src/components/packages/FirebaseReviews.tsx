
'use client';

import React, { useState } from 'react';
import { Star, User, Shield, ThumbsUp, Plus, Loader2 } from 'lucide-react';
import { useReviews } from '@/hooks/use-firestore';
import { addReview } from '@/lib/firebase-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import StarRating from '@/components/ui/StarRating';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


interface FirebaseReviewsProps {
  packageId: string;
  rating: number;
  reviewCount: number;
}

export default function FirebaseReviews({ packageId, rating, reviewCount }: FirebaseReviewsProps) {
  const { reviews, loading, refetch } = useReviews(packageId);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 0,
    comment: '',
  });
  const { toast } = useToast();

  const handleRatingChange = (newRating: number) => {
    setNewReview({ ...newReview, rating: newRating });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      toast({
        title: 'Rating Required',
        description: 'Please select a star rating before submitting.',
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);

    try {
      const reviewData = {
        ...newReview,
        packageId,
        date: new Date().toISOString(),
        verified: false, // Or logic to determine if user has booked before
      };
      
      const reviewId = await addReview(reviewData);

      if (reviewId) {
        setNewReview({ userName: '', rating: 0, comment: '' });
        setShowReviewForm(false);
        refetch();
        toast({
          title: 'Review Submitted!',
          description: "Thanks for your feedback. It will appear after moderation.",
        });
      } else {
        toast({
          title: 'Submission Failed',
          description: 'Failed to submit review. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: 'An Error Occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-card/50 rounded-xl p-6 border">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-3xl font-bold">{rating.toFixed(1)}</span>
              <StarRating rating={rating} />
            </div>
            <p className="text-muted-foreground">Based on {reviewCount} verified reviews</p>
          </div>
          <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Write a Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Your Name</label>
                        <Input
                            value={newReview.userName}
                            onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Your Rating</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                'h-7 w-7 cursor-pointer transition-colors',
                                newReview.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              )}
                              onClick={() => handleRatingChange(star)}
                            />
                          ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Your Review</label>
                        <Textarea
                            rows={4}
                            value={newReview.comment}
                            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                            placeholder="Share your experience..."
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={submitting}>
                            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card/50 border rounded-xl p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{review.userName}</span>
                    {review.verified && (
                      <div className="flex items-center space-x-1 bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs">
                        <Shield className="h-3 w-3" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-foreground/80 mb-3">{review.comment}</p>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1 hover:text-primary">
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful</span>
              </Button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && !loading && (
            <div className="text-center py-8 text-muted-foreground">
                <p>No reviews yet. Be the first to write one!</p>
            </div>
        )}
      </div>
    </div>
  );
}
