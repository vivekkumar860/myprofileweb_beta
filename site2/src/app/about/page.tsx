import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Target, Award } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getPageSEO } from "@/lib/seo";

export const metadata: Metadata = getPageSEO({
  pageTitle: "About",
  pageDesc: "Learn more about our company and mission",
  pageKeywords: ["about", "company", "mission", "team"],
});

export default function AboutPage() {
  const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "100+" },
    { label: "Happy Clients", value: "50+" },
    { label: "Team Members", value: "10+" },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To create exceptional digital experiences that drive business growth and user satisfaction.",
    },
    {
      icon: Users,
      title: "Our Team",
      description: "A passionate team of developers, designers, and strategists working together to deliver excellence.",
    },
    {
      icon: Award,
      title: "Our Values",
      description: "Innovation, quality, and customer success are at the core of everything we do.",
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
          About Us
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          We are a passionate team dedicated to creating exceptional digital experiences. 
          Our mission is to help businesses thrive in the digital world through innovative 
          solutions and cutting-edge technology.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-8 mb-16 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
        {values.map((value) => (
          <Card key={value.title}>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{value.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{value.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Work Together?</h2>
        <p className="text-muted-foreground mb-8">
          Let&apos;s discuss how we can help bring your vision to life.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </div>
  );
} 