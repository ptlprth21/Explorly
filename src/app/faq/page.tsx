
import Container from '@/components/ui/Container';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqs = [
  {
    title: '✈️ Booking & Travel Logistics',
    content: [
      {
        question: 'What is Explorly, and who is behind the service?',
        answer: 'Explorly is the dedicated, expert travel service division of THEVIPGROUP Sp. z o.o. (KRS: 0001184948), a management and service company based in Warsaw, Poland. We combine the logistical excellence and reliability of THEVIPGROUP with a passion for crafting bespoke, authentic travel experiences worldwide.',
      },
      {
        question: 'How can I secure a trip booking?',
        answer: 'You can secure your trip with an initial payment of a non-refundable deposit (the amount will be specified during the booking process). This deposit allows us to reserve key components of your itinerary and lock in pricing. Please note that this deposit is non-refundable under all circumstances, as it covers initial administrative and planning costs.',
      },
      {
        question: 'Are flights included in the package prices?',
        answer: 'No. Our package prices do not include international or domestic airfare to or from the destination (e.g., flights to/from Abu Dhabi or Dubai). This gives you the flexibility to choose your preferred airline, departure city, and travel dates. Transfers from the arrival and departure airports (as specified in your itinerary) are included in the package price.',
      },
      {
        question: 'How does the hotel booking work?',
        answer: 'For most of our curated packages, Explorly handles the booking of the hotel accommodation as specified in the itinerary (e.g., 4-Star or 5-Star luxury). The price you pay includes the cost of the hotel stay, but the physical booking and contract are managed by Explorly/THEVIPGROUP.',
      },
      {
        question: 'What type of transportation is used during the tours?',
        answer: 'Transportation varies by package and tier, but is always high-quality:\n\n• VIP/Premium Packages: Primarily private, dedicated vehicle transfers between airports, cities, and scheduled activities.\n\n• Mid-Range Packages: Private vehicle transfers for arrival, departure, and intercity travel, combined with Shared transfers (SIC - Seat In Coach) for daily tours and group activities (like the Desert Safari) to maximize value.',
      },
    ]
  },
  {
    title: '🛂 Visas & Documentation',
    content: [
      {
        question: 'Does Explorly assist with visa requirements?',
        answer: 'Explorly does not provide assistance with visa applications or entry requirements. It is the sole responsibility of the traveler to research, confirm, and obtain all necessary visas and documentation (including passport validity) required for entry into the destination country(s). We recommend checking with the relevant embassy or consulate well in advance of your trip.',
      },
    ]
  },
  {
    title: '🛡️ Cancellations, Refunds, & Insurance',
    content: [
      {
        question: "What is Explorly's cancellation and refund policy?",
        answer: 'Our refund policy is based on the proximity of the cancellation date to the scheduled start date of your trip: \n\n• Initial Deposit: The initial deposit paid to secure the booking is non-refundable under all circumstances.\n\n• Cancellation more than one (1) week (7 days) prior to the trip start date: You are eligible for a partial refund of payments made beyond the initial deposit. The refundable amount will be determined based on non-recoverable costs (e.g., non-refundable tickets or committed payments) already paid to suppliers on your behalf.\n\n• Cancellation within one (1) week (7 days) of the trip start date: Due to committed vendor costs for accommodation, transfers, and activities, no further refund can be issued (beyond the non-recoverable deposit) for cancellations made during this period.',
      },
      {
        question: 'What should I do if I need to cancel or change my booking?',
        answer: 'All cancellation or change requests must be submitted in writing via email to our dedicated support address. We will then process your request according to the policy timelines above and advise on any applicable refunds or fees.',
      },
      {
        question: 'Is travel insurance included in the package price?',
        answer: 'No, travel insurance is not included in any package price. We highly recommend that all travelers purchase comprehensive travel insurance that covers trip cancellation, health, luggage loss, and personal liability. For packages including high-adrenaline activities (like skydiving), specific insurance is often required.',
      },
    ]
  },
  {
    title: '📞 Support & Safety',
    content: [
      {
        question: 'What kind of support is offered during the trip?',
        answer: 'We offer 24/7 on-ground support for every traveler. If you encounter any issues, delays, or emergencies during your trip, you can contact our dedicated support line at any time. Our team is always available to assist with logistics, local information, or emergency services.',
      },
      {
        question: 'Is there an emergency contact number?',
        answer: 'Yes. Your final travel documents will include a dedicated, 24/7 local emergency phone number for direct contact with our on-ground team.',
      },
    ]
  },
];

export default function FaqPage() {
  return (
    <Container className="py-16">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our trips and services.
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-8">
          {faqs.map((category, index) => (
            <Card
              key={index}
              className="bg-card/60 backdrop-blur-sm border border-border shadow-md"
            >
              <CardHeader className="bg-secondary/20 rounded-t-xl px-6 py-4">
                <CardTitle className="text-xl font-semibold text-[var(--foreground)]">
                  {category.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <Accordion type="single" collapsible>
                  {category.content.map((item, idx) => (
                    <AccordionItem key={idx} value={`item-${index}-${idx}`}>
                      <AccordionTrigger className="text-left text-base font-medium">
                        {item.question}
                      </AccordionTrigger>

                      <AccordionContent className="text-muted-foreground text-base whitespace-pre-line">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
