

'use client';

import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Loader2, Facebook, X, Instagram } from 'lucide-react';
import { Icon } from '@iconify/react'; 
import Image from 'next/image';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/ai/flows/contact-flow';
import placeholderImages from '@/lib/placeholder-images.json';


export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(formData);
      toast({
        title: "Message Sent!",
        description: result.reply,
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Error",
        description: "Could not send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="relative h-64 w-full">
        <Image
          src={placeholderImages.contactHero}
          alt="A person writing on a notebook with a laptop nearby"
          data-ai-hint="contact us"
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" className="h-12" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="h-12" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your question or feedback..." rows={6} value={formData.message} onChange={handleChange} required />
              </div>
              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </div>
          <div className="space-y-8 bg-background p-8 md:p-12 rounded-xl shadow-xl">
            <div>
              <h2 className="text-3xl font-headline font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                Have questions? We're here to help. Reach out to us via phone, email, or visit us at our main office. We look forward to planning your next adventure!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Email */}
              <div className="bg-card p-4 md:p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <Mail className="w-10 md:w-12 h-10 md:h-12 text-primary mb-3 md:mb-4" />
                <p className="text-base md:text-lg font-semibold text-foreground mb-1">
                  Email
                </p>
                <a
                  href="mailto:support@explorly.eu"
                  className="text-primary hover:underline transition duration-300 text-sm md:text-base break-all"
                >
                  support@explorly.eu
                </a>
              </div>

              {/* Address */}
              <div className="bg-card p-4 md:p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <MapPin className="w-10 md:w-12 h-10 md:h-12 text-primary mb-3 md:mb-4" />
                <p className="text-base md:text-lg font-semibold text-foreground mb-1">
                  Office
                </p>
                <a
                  href="https://www.google.com/maps?q=ul.+Solipska+3/5,+02-482+Warsaw,+Poland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition duration-300 text-sm md:text-base break-all"
                >
                  ul. Solipska 3/5, 02-482 Warsaw, Poland
                </a>
              </div>
            </div>

            {/* Social icons */}
            <div className="space-y-4 pt-4 text-center">
              <h3 className="text-2xl font-headline font-bold">Find Us on Social Media</h3>

              <div className="flex justify-center items-center gap-6">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61584087081987"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-colors"
                >
                  <Facebook className="h-6 w-6 text-foreground/60 hover:text-primary" />
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com/explorly___"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="transition-colors"
                >
                  <X className="h-6 w-6 text-foreground/60 hover:text-primary" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/explorly___/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-colors"
                >
                  <Instagram className="h-6 w-6 text-foreground/60 hover:text-primary" />
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@explorly"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="transition-colors"
                >
                  <Icon
                    icon="simple-icons:tiktok"
                    className="h-6 w-6 text-foreground/60 hover:text-primary"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
