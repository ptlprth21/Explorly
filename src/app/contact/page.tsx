import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <>
      <section className="relative h-64 w-full">
        <Image
          src="https://picsum.photos/seed/contact-hero/1920/1080"
          alt="A person writing on a notebook with a laptop nearby"
          data-ai-hint="writing contact"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-headline font-bold text-white">Get in Touch</h1>
        </div>
      </section>

      <Container className="py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-card p-8 rounded-lg">
            <h2 className="text-3xl font-headline font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your question or feedback..." rows={6} />
              </div>
              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Submit</Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-headline font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                Have questions? We're here to help. Reach out to us via phone, email, or visit us at our main office. We look forward to planning your next adventure!
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-muted-foreground">support@roamready.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-muted-foreground">(+1) 234-567-890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Office</h3>
                  <p className="text-muted-foreground">123 Adventure Ave, Wanderlust City, 98765</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
