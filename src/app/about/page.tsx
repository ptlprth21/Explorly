import Container from '@/components/ui/Container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'Founder & CEO',
    avatarUrl: 'https://picsum.photos/seed/alex/200',
    bio: 'Alex is a passionate traveler who turned his love for exploration into a mission to make adventure accessible to everyone.',
  },
  {
    name: 'Maria Garcia',
    role: 'Head of Operations',
    avatarUrl: 'https://picsum.photos/seed/maria/200',
    bio: 'Maria ensures every trip is seamless, safe, and unforgettable, managing all the behind-the-scenes details.',
  },
  {
    name: 'Sam Chen',
    role: 'Lead Developer',
    avatarUrl: 'https://picsum.photos/seed/sam/200',
    bio: 'Sam is the architect of our platform, dedicated to creating a user-friendly and beautiful booking experience.',
  },
];

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
          <h1 className="text-5xl font-headline font-bold text-white">About RoamReady</h1>
        </div>
      </section>

      <Container className="py-16">
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-headline font-bold">Our Mission</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We believe that travel has the power to transform. Our mission is to craft unique, authentic, and sustainable travel experiences that connect you with the world and create memories that last a lifetime. We handle the logistics, so you can focus on the adventure.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center p-6 bg-card rounded-lg">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-xl">{member.name}</h3>
                <p className="text-primary font-semibold">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
