

import Container from '@/components/ui/Container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Award, Globe, Heart, LifeBuoy } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import placeholderImages from '@/lib/placeholder-images.json';

// const teamMembers = [
//   { name: 'Alex Johnson', role: 'Founder & CEO', image: placeholderImages.team.alex },
//   { name: 'Maria Garcia', role: 'Head of Operations', image: placeholderImages.team.maria },
//   { name: 'Sam Chen', role: 'Lead Travel Designer', image: placeholderImages.team.sam },
//   { name: 'Emily White', role: 'Customer Experience', image: placeholderImages.team.emily },
// ];

const whyChooseUsItems = [
    { icon: Globe, title: 'Expert-Curated Trips', description: 'Every itinerary is thoughtfully designed by our experienced travel experts. We combine creative, engaging trip planning with the rock-solid reliability and financial stability of THEVIPGROUP, ensuring every detail—from the initial booking to the final transfer—is handled with utmost professionalism.' },
    { icon: Heart, title: 'Authentic Experiences', description: 'We are committed to taking you beyond the typical tourist path. We actively seek out local cultures, connect you with community experiences, and reveal hidden gems, ensuring your journey is not just sightseeing, but a genuine cultural exchange. We prioritize responsible travel that benefits the places you visit.' },
    { icon: Award, title: 'Seamless Planning', description: "Your peace of mind is our priority. Drawing on THEVIPGROUP's logistical expertise, we meticulously manage all the complexities of your trip—from securing specialized tickets and arranging luxury transfers to coordinating intercity travel. With us, your planning is effortless, and your focus remains solely on the adventure ahead." },
    { icon: LifeBuoy, title: '24/7 Dedicated Support', description: 'No matter where your adventure takes you, our dedicated team is always available. We provide 24/7 on-ground support, ensuring immediate assistance and quick resolutions to any issue. You travel with the confidence of knowing professional help is just a phone call away.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[450px] w-full">
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

      <section className="w-full bg-white/5 py-12 text-center">
        <h5 className="max-w-5xl mx-auto text-3xl font-headline font-bold text-white">
          Explorly is where passion for travel meets the excellence of THEVIPGROUP.
          Join us, and let’s explore the world together.
        </h5>
      </section>

      <Container className="py-16">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-headline font-bold">Our Story</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explorly is the dedicated travel service of THEVIPGROUP Sp. z o.o., a company built on 
            the foundation of excellence and comprehensive service. Born from THEVIPGROUP's 
            commitment to high standards and attention to detail, Explorly was founded to bring that 
            same dedication to the world of bespoke travel. 
            <br />
            <br />
            We leverage the established operational framework and professionalism of THEVIPGROUP 
            to ensure that every journey we create is not just a trip, but a meticulously planned, 
            transformative experience. Explorly represents the fusion of corporate reliability and 
            passionate, expert travel design. 
          </p>
        </section>

        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-headline font-bold">Our Mission</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            At Explorly, we believe that travel has the power to transform. Our core mission is to craft 
            unique, authentic, and sustainable travel experiences that connect you with the world, its 
            people, and yourself. We handle the complex logistics and meticulous planning, so you can 
            fully immerse yourself in the adventure and create memories that truly last a lifetime. 
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">
            Why Choose Explorly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsItems.map(item => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="bg-white/10 border-white/20 text-center rounded-2xl p-6 flex flex-col items-center shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Reducimos separación del header */}
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="text-xl font-bold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0">
                    <p className="text-muted-foreground text-base text-left leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </Container>
    </>
  );
}
