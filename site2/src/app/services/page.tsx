import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Code, Palette, Smartphone, Globe, Database, Shield } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getPageSEO } from "@/lib/seo";

export const metadata: Metadata = getPageSEO({
  pageTitle: "Services",
  pageDesc: "Explore our comprehensive range of web development and digital services",
  pageKeywords: ["services", "web development", "design", "consulting"],
});

export default function ServicesPage() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with modern technologies like Next.js, React, and TypeScript.",
      features: ["Responsive Design", "Performance Optimization", "SEO Integration", "Modern Frameworks"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces designed with user experience in mind.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Cross-platform mobile applications that work seamlessly across all devices.",
      features: ["React Native", "Native Development", "App Store Optimization", "Performance"],
    },
    {
      icon: Globe,
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms that drive sales and enhance customer experience.",
      features: ["Payment Integration", "Inventory Management", "Analytics", "Security"],
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Robust and scalable backend systems that power your applications.",
      features: ["API Development", "Database Design", "Cloud Infrastructure", "Security"],
    },
    {
      icon: Shield,
      title: "Consulting",
      description: "Strategic technology consulting to help you make informed decisions.",
      features: ["Technology Assessment", "Architecture Planning", "Performance Audits", "Security Reviews"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Our Services
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          We offer a comprehensive range of digital services to help your business 
          thrive in the modern digital landscape.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="h-full">
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8">
          Let&apos;s discuss your project and find the perfect solution for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Get a Quote</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 