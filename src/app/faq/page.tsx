
import Container from '@/components/ui/Container';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is included in the package price?',
    answer: 'Each package is different, but generally, the price includes accommodation, guided tours, and specific activities mentioned in the "Inclusions" section on the package details page. International flights are typically not included unless specified.',
  },
  {
    question: 'How do I book a trip?',
    answer: 'You can book a trip directly from the package details page by clicking the "Book This Trip" button and following the steps in our secure booking wizard. You can also start the process from the floating "Plan My Trip" panel.',
  },
  {
    question: 'Can I customize a tour?',
    answer: 'Currently, we offer pre-packaged tours. For customization options, please contact our support team, and we will do our best to accommodate your requests for private group bookings.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Our cancellation policy varies depending on the package and how far in advance you cancel. Please refer to the terms and conditions provided during the booking process or contact us for specific details.',
  },
   {
    question: 'Are flights included in the packages?',
    answer: 'International and domestic flights are generally not included in the package price unless explicitly stated in the "Inclusions" list on the package page. This gives you the flexibility to book your flights from any destination.',
  },
  {
    question: 'Do I need travel insurance?',
    answer: 'Yes, we strongly recommend that all our travelers have comprehensive travel insurance. Insurance should cover trip cancellation, medical emergencies, lost luggage, and other unforeseen events.',
  },
];

export default function FaqPage() {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">Find answers to common questions about our trips and services.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
}
