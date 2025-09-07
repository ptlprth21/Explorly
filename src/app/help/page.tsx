
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LifeBuoy, Mail, MessageSquare } from 'lucide-react';

export default function HelpCenterPage() {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground">How can we help you plan your next adventure?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Card>
            <CardHeader>
              <MessageSquare className="h-10 w-10 mx-auto text-primary mb-4" />
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Find quick answers to common questions in our FAQ section.</p>
              <Link href="/faq" className="text-primary hover:underline">Go to FAQ</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Mail className="h-10 w-10 mx-auto text-primary mb-4" />
              <CardTitle>Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Send us an email and our team will get back to you shortly.</p>
              <a href="mailto:support@roamready.com" className="text-primary hover:underline">support@roamready.com</a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <LifeBuoy className="h-10 w-10 mx-auto text-primary mb-4" />
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">For urgent matters, visit our contact page for more options.</p>
              <Link href="/contact" className="text-primary hover:underline">Contact Page</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
