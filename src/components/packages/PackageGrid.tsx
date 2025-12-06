import { Package, Theme } from "@/types";
import PackageCard from "./PackageCard";
import { Skeleton } from "../ui/skeleton";

interface PackageGridProps {
  packages: Package[];
  isLoading?: boolean;
  themes?: Theme[];
}

const PackageGrid = ({ packages, isLoading, themes }: PackageGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-80 w-full rounded-2xl" />
        ))}
      </div>
    );
  }
    
  if (packages.length === 0) {
    return <p className="text-center text-muted-foreground py-16">No packages found matching your criteria.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {packages.map(pkg => {
          return <PackageCard key={pkg.id} package={pkg} themes={pkg.themes} />;
        })}
    </div>
  );
};

export default PackageGrid;
