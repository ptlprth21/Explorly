import { getPackageById, getReviewsByPackageId } from '@/lib/mock-data';
import Container from '@/components/ui/Container';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/ui/StarRating';
import { Clock, Mountain, MapPin, CheckCircle, XCircle, Users, Calendar, BrainCircuit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import PackageGallery from '@/components/packages/PackageGallery';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

export default async function PackageDetailPage({ params }: { params: { id: string } }) {
  const pkg = await getPackageById(params.id);
  
  if (!pkg) {
    notFound();
  }

  const reviews = getReviewsByPackageId(pkg.id);

  return (
    <Container className="py-12">
      {/* Header Section */}
      <section className="mb-8">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">{pkg.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mt-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{pkg.destination}, <Link href={`/country/${slugify(pkg.country)}`} className="hover:text-primary hover:underline">{pkg.country}</Link></span>
          </div>
          <div className="flex items-center gap-2">
            <StarRating rating={pkg.rating} />
            <span>{pkg.rating.toFixed(1)} ({pkg.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4" />
            <span>{pkg.difficulty}</span>
          </div>
        </div>
      </section>

      {/* Gallery and Booking */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PackageGallery mainImage={pkg.image} gallery={pkg.gallery} title={pkg.title} />
          <Card className="mt-4 bg-primary/10 border-primary/30">
            <CardHeader className='flex-row items-center gap-4 space-y-0 pb-2'>
              <BrainCircuit className="w-8 h-8 text-primary" />
              <CardTitle className="text-primary text-lg">AI-Powered Image Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-primary/80">{pkg.aiReasoning}</p>
            </CardContent>
          </Card>
        </div>
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl">Book Your Trip</CardTitle>
              <p className="text-muted-foreground text-sm">from <span className="text-3xl font-bold text-primary">${pkg.price}</span> per person</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                  <label htmlFor="travel-date" className="font-medium text-sm">Travel Date</label>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      Select a date
                  </Button>
              </div>
              <div className="space-y-2">
                  <label htmlFor="travelers" className="font-medium text-sm">Travelers</label>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Users className="mr-2 h-4 w-4" />
                      2 travelers
                  </Button>
              </div>
              <Link href={`/book/${pkg.id}`} className="w-full">
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg">Book Now</Button>
              </Link>
            </CardContent>
          </Card>
        </aside>
      </section>
      
      {/* Details Tabs */}
      <section className="mt-12">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="inclusions">What's Included</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="prose prose-invert max-w-none mt-6">
            <h3 className="font-bold text-xl mb-4">Trip Overview</h3>
            <p>{pkg.description}</p>
            <h4 className="font-bold text-lg mt-6 mb-2">Highlights</h4>
            <ul className="list-disc pl-5">
              {pkg.highlights.map((highlight, i) => <li key={i}>{highlight}</li>)}
            </ul>
          </TabsContent>
          
          <TabsContent value="itinerary" className="mt-6">
            <div className="space-y-6">
              {pkg.itinerary.map((step) => (
                <div key={step.day} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">{step.day}</div>
                    <div className="w-px h-full bg-border"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{step.title}</h4>
                    <p className="text-muted-foreground mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inclusions" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Inclusions</h3>
              <ul className="space-y-2">
                {pkg.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
             <div>
              <h3 className="font-bold text-xl mb-4">Exclusions</h3>
              <ul className="space-y-2">
                {pkg.exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <h3 className="font-bold text-xl mb-4">Traveler Reviews</h3>
            <div className="space-y-6">
              {reviews.map(review => (
                <Card key={review.id} className="bg-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold">{review.userName}</h4>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </Container>
  );
}
