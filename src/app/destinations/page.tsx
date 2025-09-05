import Container from '@/components/ui/Container';
import { getPackages } from '@/lib/data';
import PackageGrid from '@/components/packages/PackageGrid';
import FilterControls from '@/components/packages/FilterControls';
import type { Package } from '@/types';

export default async function DestinationsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const allPackages = await getPackages();
  
  const continent = searchParams?.continent as string | undefined;
  const sortBy = searchParams?.sortBy as string | undefined;
  const priceRange = searchParams?.price as string | undefined;
  const difficulty = searchParams?.difficulty as string | undefined;

  let filteredPackages = allPackages;

  if (continent && continent !== 'all') {
    filteredPackages = filteredPackages.filter(p => p.continent === continent);
  }

  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      filteredPackages = filteredPackages.filter(p => p.price >= min && p.price <= max);
    }
  }

  if (difficulty && difficulty !== 'all') {
    filteredPackages = filteredPackages.filter(p => p.difficulty.toLowerCase() === difficulty);
  }
  
  if (sortBy) {
    filteredPackages.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          // A simple duration sort, assuming "X days" format
          return parseInt(a.duration) - parseInt(b.duration);
        default: // popularity (default, could be based on reviewCount)
          return b.reviewCount - a.reviewCount;
      }
    });
  }

  return (
    <Container className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">All Destinations</h1>
        <p className="text-lg text-muted-foreground mt-2">Browse our curated collection of adventures.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
            <FilterControls />
        </aside>
        <main className="md:col-span-3">
          <PackageGrid packages={filteredPackages} />
        </main>
      </div>
    </Container>
  );
}
