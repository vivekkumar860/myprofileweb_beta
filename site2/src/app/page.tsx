import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, Palette, Zap, Shield, Smartphone, Globe } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getPageSEO } from "@/lib/seo";

export const metadata: Metadata = getPageSEO({
  pageTitle: "Home",
  pageDesc: "A modern Next.js website with TypeScript, Tailwind CSS, and ShadCN UI",
  pageKeywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "ShadCN UI"],
});

export default function Home() {
  const features = [
    {
      icon: Code,
      title: "TypeScript",
      description: "Built with TypeScript for type safety and better developer experience.",
    },
    {
      icon: Palette,
      title: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development.",
    },
    {
      icon: Zap,
      title: "ShadCN UI",
      description: "Beautiful and accessible components built with Radix UI and Tailwind CSS.",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Built with security best practices and modern web standards.",
    },
    {
      icon: Smartphone,
      title: "Responsive",
      description: "Fully responsive design that works on all devices and screen sizes.",
    },
    {
      icon: Globe,
      title: "SEO Optimized",
      description: "Built-in SEO features with meta tags and Open Graph support.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome to{" "}
              <span className="text-primary">My Website</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              A modern Next.js 14 website built with TypeScript, Tailwind CSS, and ShadCN UI. 
              Featuring dark/light mode, responsive design, and SEO optimization.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/about">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built with Modern Technologies
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              This website showcases the latest web development technologies and best practices.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore the features and see how this modern Next.js setup can help you build amazing websites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
