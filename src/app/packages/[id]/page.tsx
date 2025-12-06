import Head from "next/head";
import { notFound } from "next/navigation";

import { getPackages, getPackageById } from "@/lib/data";
import PackageClient from "@/components/packages/PackageClient";

export async function generateStaticParams() {
  const packages = await getPackages();
  return packages.map((pkg) => ({ id: pkg.id.toString() }));
}

interface Props {
  params: { id: string };
}

export default async function PackageDetailPage({ params }: Props) {
  const pkg = await getPackageById(params.id);
  if (!pkg) return notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": pkg.title,
        "description": pkg.description,
        "image": [pkg.image, ...(pkg.gallery ?? [])],
        "sku": pkg.id,
        "brand": { "@type": "Brand", "name": "THEVIPGROUP" },
        "offers": {
        "@type": "Offer",
        "url": typeof window !== "undefined" ? window.location.href : "",
        "price": pkg.price,
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
        },
        "aggregateRating": pkg.rating
        ? {
            "@type": "AggregateRating",
            "ratingValue": pkg.rating,
            "reviewCount": pkg.reviewCount ?? 1
            }
        : undefined
    };

  return (
    <>
        <Head>
            <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        /></Head>

        <PackageClient pkg={pkg} />
    </>
  );
}