'use client';

import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Container from '../ui/Container';

const Hero = () => {
  return (
    <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center text-center">
      <Image
        src="https://picsum.photos/seed/hero-bg/1920/1080"
        alt="Breathtaking mountain landscape at sunrise"
        data-ai-hint="mountain landscape"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg animate-fade-in-up">
            Find Your Next Adventure
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md animate-fade-in-up animation-delay-300">
            Discover curated travel packages, from relaxing beach getaways to thrilling safari adventures.
          </p>
          <div className="mt-8 flex w-full max-w-xl items-center space-x-2 animate-fade-in-up animation-delay-600">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search destinations, e.g., 'Tanzania'"
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground">
              Search
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
