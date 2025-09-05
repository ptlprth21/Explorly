
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "../ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { Continent } from "@/types"
import { getContinents } from "@/lib/data"


const FilterControls = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [continents, setContinents] = useState<Continent[]>([]);

    useEffect(() => {
        const fetchContinents = async () => {
            const fetchedContinents = await getContinents();
            setContinents(fetchedContinents);
        };
        fetchContinents();
    }, []);

    const [filters, setFilters] = useState({
        sortBy: searchParams.get('sortBy') || 'popularity',
        price: (searchParams.get('price')?.split('-').map(Number)) || [0, 10000],
        difficulty: searchParams.get('difficulty') || 'all',
        continent: searchParams.get('continent') || 'all',
    });

    useEffect(() => {
        setFilters({
            sortBy: searchParams.get('sortBy') || 'popularity',
            price: (searchParams.get('price')?.split('-').map(Number)) || [0, 10000],
            difficulty: searchParams.get('difficulty') || 'all',
            continent: searchParams.get('continent') || 'all',
        })
    }, [searchParams])
    
    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.set('sortBy', filters.sortBy);
        params.set('price', `${filters.price[0]}-${filters.price[1]}`);
        params.set('difficulty', filters.difficulty);
        params.set('continent', filters.continent);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <Card className="sticky top-20">
            <CardHeader>
                <CardTitle>Filter & Sort</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Label htmlFor="sort-by">Sort by</Label>
                    <Select value={filters.sortBy} onValueChange={(value) => setFilters(f => ({ ...f, sortBy: value }))}>
                        <SelectTrigger id="sort-by">
                            <SelectValue placeholder="Popularity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popularity">Popularity</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                            <SelectItem value="duration">Duration</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    <Label>Price Range</Label>
                    <Slider 
                        value={filters.price} 
                        onValueChange={(value) => setFilters(f => ({ ...f, price: value }))} 
                        max={10000} 
                        step={100} 
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${filters.price[0]}</span>
                        <span>${filters.price[1]}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <Label>Difficulty</Label>
                    <RadioGroup value={filters.difficulty} onValueChange={(value) => setFilters(f => ({ ...f, difficulty: value }))}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="d-all" />
                            <Label htmlFor="d-all">All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="easy" id="d-easy" />
                            <Label htmlFor="d-easy">Easy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moderate" id="d-moderate" />
                            <Label htmlFor="d-moderate">Moderate</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="hard" id="d-hard" />
                            <Label htmlFor="d-hard">Hard</Label>
                        </div>
                    </RadioGroup>
                </div>
                
                <div className="space-y-4">
                    <Label htmlFor="continent">Continent</Label>
                    <Select value={filters.continent} onValueChange={(value) => setFilters(f => ({ ...f, continent: value }))}>
                        <SelectTrigger id="continent">
                            <SelectValue placeholder="All Continents" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Continents</SelectItem>
                            {continents.map(c => (
                                <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={handleApplyFilters} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Apply Filters</Button>
            </CardContent>
        </Card>
    )
}

export default FilterControls
