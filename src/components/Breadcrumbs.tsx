import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  href?: string;
}

/** Visible breadcrumb trail (matches the BreadcrumbList structured data). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center justify-center gap-1.5">
        {items.map((c, i) => (
          <li key={c.name} className="flex items-center gap-1.5">
            {c.href ? (
              <Link to={c.href} className="transition-colors hover:text-primary">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {c.name}
              </span>
            )}
            {i < items.length - 1 && <ChevronRight className="size-3.5" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
