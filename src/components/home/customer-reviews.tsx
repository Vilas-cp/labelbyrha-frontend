import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  name: string;
  avatarSrc?: string;
  rating: number;
  quote: string;
}

interface CustomerReviewsProps {
  title: string;
  description?: string;
  reviews: readonly Review[];
}

function CustomerReviews({ title, description, reviews }: CustomerReviewsProps) {
  return (
    <section className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionTitle title={title} description={description} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={cn(
                        "size-4",
                        index < review.rating
                          ? "fill-accent text-accent"
                          : "text-border",
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarImage src={review.avatarSrc} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium text-foreground">
                    {review.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { CustomerReviews };
