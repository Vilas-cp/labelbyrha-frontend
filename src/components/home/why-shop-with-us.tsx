import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface WhyShopWithUsProps {
  title: string;
  description?: string;
  features: readonly Feature[];
}

function WhyShopWithUs({ title, description, features }: WhyShopWithUsProps) {
  return (
    <section className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionTitle title={title} description={description} />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
                <feature.icon className="size-6 text-accent" />
              </div>
              <p className="text-sm font-medium text-foreground">
                {feature.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { WhyShopWithUs };
