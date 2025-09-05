import { getPackagesByCountry, getReviewsByCountry } from '@/lib/data';
import Container from '@/components/ui/Container';
import { notFound } from 'next/navigation';
import PackageGrid from '@/components/packages/PackageGrid';
import TravelerGallery from '@/components/country/TravelerGallery';
import AggregatedReviews from '@/components/country/AggregatedReviews';

export default async function CountryPage({ params }: { params: { name: string } }) {
  const packagesInCountry = await getPackagesByCountry(params.name);
  
  if (packagesInCountry.length === 0) {
    // We could show a "No packages for this country" page, 
    // but for now, we'll 404 if the slug is invalid.
    notFound();
  }

  const reviewsInCountry = await getReviewsByCountry(params.name);
  const countryName = packagesInCountry[0].country;
  const galleryImages = packagesInCountry.flatMap(p => p.gallery).slice(0, 15); // Get up to 15 images

  return (
    <Container className="py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Adventures in {countryName}</h1>
        <p className="text-lg text-muted-foreground mt-2">Explore the beauty and culture of {countryName}.</p>
      </section>

      <section className="mb-16">
        <AggregatedReviews reviews={reviewsInCountry} />
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-headline font-bold mb-8 text-center">Traveler Gallery</h2>
        <TravelerGallery images={galleryImages} />
      </section>
      
      <section>
        <h2 className="text-3xl font-headline font-bold mb-8 text-center">Available Packages in {countryName}</h2>
        <PackageGrid packages={packagesInCountry} />
      </section>
    </Container>
  );
}

// Optional: Generate static paths for known countries to improve performance
export async function generateStaticParams() {
    const packages = await getPackagesByCountry(''); // Poor way to get all, but works for mock
    const countrySlugs = [...new Set(packages.map(p => p.country))].map(c => ({ name: c.toLowerCase().replace(' ', '-') }));
   
    return countrySlugs;
}
