
import { Package } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Clock, ArrowRight } from "lucide-react";

interface PackageCardProps {
  package: Package;
}

const PackageCard = ({ package: pkg }: PackageCardProps) => {
  return (
    <Link href={`/packages/${pkg.id}`} className="group block h-full">
      <div 
        className="relative group cursor-pointer overflow-hidden rounded-2xl h-80 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl h-full"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            data-ai-hint="travel landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex flex-col justify-between p-6 text-white">
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-medium">{pkg.type}</span>
            </div>
            <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold">{pkg.rating}</span>
            </div>
          </div>

          {/* Bottom Section */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-teal-400" />
              <span className="text-sm text-gray-300">{pkg.destination}</span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-teal-400 transition-colors">
              {pkg.title}
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{pkg.duration} Days</span>
                </div>
                <div className="text-lg font-bold text-teal-400">
                  ${pkg.price.toLocaleString()}
                </div>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-5 w-5 text-teal-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-400/50 rounded-2xl transition-all duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
};

export default PackageCard;
