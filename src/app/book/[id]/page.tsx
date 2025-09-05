import BookingWizard from '@/components/booking/BookingWizard';
import Container from '@/components/ui/Container';
import { getPackageById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function BookingPage({ params }: { params: { id: string } }) {
  const pkg = await getPackageById(params.id);

  if (!pkg) {
    notFound();
  }

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <BookingWizard package={pkg} />
      </div>
    </Container>
  );
}
