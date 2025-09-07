import Container from '@/components/ui/Container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <section className="relative h-64 w-full">
        <Image
          src="https://picsum.photos/seed/about-hero/1920/1080"
          alt="A team of hikers celebrating on a mountain peak"
          data-ai-hint="team mountains"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-headline font-bold text-white">About Explorly</h1>
        </div>
      </section>

      <Container className="py-16">
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-headline font-bold">Our Mission</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We believe that travel has the power to transform. Our mission is to craft unique, authentic, and sustainable travel experiences that connect you with the world and create memories that last a lifetime. We handle the logistics, so you can focus on the adventure.
          </p>
        </section>
      </Container>
    </>
  );
}
