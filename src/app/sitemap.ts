import { MetadataRoute } from "next";

export default function sitemap() : MetadataRoute.Sitemap {
    return [
        {
            url: "https://explorly.eu",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1
        },
        {
            url: "https://explorly.eu/destinations",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8
        }
    ];
}