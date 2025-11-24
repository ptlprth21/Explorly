"use client";

import React from "react";
import Container from "@/components/ui/Container";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Country, ContinentName } from "@/types";
import { getCountries } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function DestinationsPage() {
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = React.useState<Country[]>([]);
  const [continentFilter, setContinentFilter] = React.useState<ContinentName | "all">("all");
  const [countryFilter, setCountryFilter] = React.useState<string | "all">("all");

  React.useEffect(() => {
    const load = async () => {
      const data = await getCountries();
      setCountries(data);
      setFilteredCountries(data);
    };
    load();
  }, []);

  // Unique continents
  const continents = [...new Set(countries.map((c) => c.continent))];

  // Countries visible depending on selected continent
  const visibleCountries =
    continentFilter === "all"
      ? countries
      : countries.filter((c) => c.continent === continentFilter);

  // Filtering logic
  React.useEffect(() => {
    let filtered = [...countries];

    if (continentFilter !== "all") {
      filtered = filtered.filter((c) => c.continent === continentFilter);
    }

    if (countryFilter !== "all") {
      filtered = filtered.filter((c) => c.name === countryFilter);
    }

    setFilteredCountries(filtered);
  }, [continentFilter, countryFilter, countries]);

  return (
    <section className="py-20" id="destinations">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Discover the World
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our handpicked destinations and embark on extraordinary journeys
          </p>
        </div>

        {/* Filters Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-card/80 backdrop-blur-sm border border-border p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Filter Countries</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Continent Filter */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Continent
                </label>
                <Select
                  value={continentFilter}
                  onValueChange={(value) => {
                    setContinentFilter(value as ContinentName | "all");
                    setCountryFilter("all"); // Reset country when continent changes
                  }}
                >
                  <SelectTrigger className="w-full text-sm">
                    <SelectValue placeholder="Select continent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Continents</SelectItem>
                    {continents.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Country Filter */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Country
                </label>
                <Select
                  value={countryFilter}
                  onValueChange={(value) => setCountryFilter(value)}
                  disabled={visibleCountries.length === 0}
                >
                  <SelectTrigger className="w-full text-sm">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {visibleCountries.map((country) => (
                      <SelectItem key={country.name} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </div>
          </Card>
        </section>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <Link
              key={country.name}
              href={`/packagesList?country=${country.name}`}
            >
              <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                <div className="relative h-48 w-full">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                    <source src={country.heroVideo} type="video/mp4"/>
                  </video>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{country.name}</span>
                    <span className="text-lg"><img src={country.flag} alt="UAE flag" className="w-6 h-auto"/></span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {country.tagline}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}