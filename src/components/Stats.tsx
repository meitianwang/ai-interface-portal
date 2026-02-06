import { Layers, Users, Building2, Boxes } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    icon: Layers,
    value: "30T",
    label: "Monthly Tokens",
    href: "/rankings",
  },
  {
    icon: Users,
    value: "5M+",
    label: "Global Users",
    href: "/rankings",
  },
  {
    icon: Building2,
    value: "60+",
    label: "Active Providers",
    href: "/docs/providers",
  },
  {
    icon: Boxes,
    value: "300+",
    label: "Models",
    href: "/models",
  },
];

export function Stats() {
  return (
    <section className="py-16 border-y border-border/50 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <p className="text-center text-sm text-muted-foreground mb-10 uppercase tracking-wider font-medium">
          Trusted by Millions
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-200">
                <stat.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-3xl sm:text-4xl font-bold tracking-tight">{stat.value}</span>
              <span className="text-sm text-muted-foreground mt-1.5">{stat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
