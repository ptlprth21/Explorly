

import Container from '@/components/ui/Container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Award, Globe, Heart, LifeBuoy } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import placeholderImages from '@/lib/placeholder-images.json';

const teamMembers = [
  { name: 'Alex Johnson', role: 'Founder & CEO', image: placeholderImages.team.alex },
  { name: 'Maria Garcia', role: 'Head of Operations', image: placeholderImages.team.maria },
  { name: 'Sam Chen', role: 'Lead Travel Designer', image: placeholderImages.team.sam },
  { name: 'Emily White', role: 'Customer Experience', image: placeholderImages.team.emily },
];

const whyChooseUsItems = [
    { icon: Globe, title: 'Expert-Curated Trips', description: 'Every itinerary is thoughtfully designed by our travel experts to ensure you have an unforgettable experience.' },
    { icon: Heart, title: 'Authentic Experiences', description: 'We connect you with local cultures and hidden gems for a journey that goes beyond the typical tourist path.' },
    { icon: Award, title: 'Seamless Planning', description: 'From booking to departure, we handle all the details so you can travel with peace of mind.' },
    { icon: LifeBuoy, title: '24/7 Support', description: 'Our dedicated team is always available to assist you, no matter where you are in the world.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative h-64 w-full">
        <Image
          src={placeholderImages.aboutHero}
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
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-headline font-bold">Our Mission</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We believe that travel has the power to transform. Our mission is to craft unique, authentic, and sustainable travel experiences that connect you with the world and create memories that last a lifetime. We handle the logistics, so you can focus on the adventure.
          </p>
        </section>

        <section className="mb-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyChooseUsItems.map(item => {
                    const Icon = item.icon;
                    return (
                        <div key={item.title} className="text-center">
                             <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                    )
                })}
            </div>
        </section>

        <section>
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map(member => (
              <Card key={member.name} className="text-center border-0 bg-transparent shadow-none">
                <CardHeader className="p-0">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </Container>
    </>
  );
}
