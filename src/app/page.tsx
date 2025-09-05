
import Hero from '@/components/home/Hero';
import PopularPackages from '@/components/home/PopularPackages';
import ContinentsExplorer from '@/components/home/ContinentsExplorer';
import Container from '@/components/ui/Container';

export default function Home() {
  return (
    <div>
      <Hero />
      <Container>
        <PopularPackages />
        <ContinentsExplorer />
      </Container>
    </div>
  );
}
