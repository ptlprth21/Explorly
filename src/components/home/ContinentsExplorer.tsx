import { continents } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';

const ContinentsExplorer = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-bold">Explore by Continent</h2>
        <p className="text-lg text-muted-foreground mt-2">Find your next journey based on where you want to go</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {continents.map((continent) => (
          <Link href={`/destinations?continent=${continent.name}`} key={continent.name} className="group relative block aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <Image
              src={continent.image}
              alt={continent.name}
              data-ai-hint={continent.dataAiHint}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold font-headline drop-shadow-md">{continent.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ContinentsExplorer;
