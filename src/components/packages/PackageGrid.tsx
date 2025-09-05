import { Package } from "@/types";
import PackageCard from "./PackageCard";
import { Skeleton } from "../ui/skeleton";

interface PackageGridProps {
  packages: Package[];
  isLoading?: boolean;
}

const PackageGrid = ({ packages, isLoading }: PackageGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg overflow-hidden shadow-lg border border-border">
                <Skeleton className="aspect-video w-full" />
                <div className="p-4 space-y-3">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-8 w-1/4" />
                    </div>
                </div>
            </div>
        ))}
      </div>
    );
  }
    
  if (packages.length === 0) {
    return <p className="text-center text-muted-foreground py-16">No packages found matching your criteria.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} package={pkg} />
      ))}
    </div>
  );
};

export default PackageGrid;
