import { cn } from "@/lib/utils";

type CaseResultCardProps = {
  label: string;
  result: string;
  context?: string;
  className?: string;
};

export function CaseResultCard({
  label,
  result,
  context,
  className,
}: CaseResultCardProps) {
  return (
    <article
      className={cn("rounded-lg border border-border bg-card p-6 sm:p-8", className)}
    >
      <p className="text-6xl leading-none font-semibold text-foreground">
        {label}
      </p>
      <p className="mt-3 text-lg font-medium text-foreground">{result}</p>
      {context ? (
        <p className="mt-6 text-sm leading-6 text-muted-foreground">{context}</p>
      ) : null}
    </article>
  );
}
