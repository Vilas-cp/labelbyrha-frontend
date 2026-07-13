import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.ComponentProps<"div"> {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  align?: "left" | "center";
}

function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <span className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl font-medium text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export { SectionTitle };
