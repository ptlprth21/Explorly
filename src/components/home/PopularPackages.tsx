import { getPackages } from '@/lib/data';
import MusicPlayerCard from './MusicPlayerCard';

const PopularPackages = async () => {
  const allPackages = await getPackages();
  // Display the first 4 as popular
  const popularPackages = allPackages.slice(0, 4);

  return (
    <section className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-bold">Popular Packages</h2>
        <p className="text-lg text-muted-foreground mt-2">Trips that our adventurers are loving right now</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {popularPackages.map((pkg) => (
          <MusicPlayerCard key={pkg.id} package={pkg} />
        ))}
      </div>
    </section>
  );
};

export default PopularPackages;
