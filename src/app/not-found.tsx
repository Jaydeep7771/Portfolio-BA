import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent-text">
        404
      </p>
      <h1 className="mt-5 max-w-lg text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        That page doesn&rsquo;t exist.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-secondary">
        Either the link is wrong or I moved something. The projects are probably
        what you were after.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/projects">View projects</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">
            <ArrowLeft />
            Back home
          </Link>
        </Button>
      </div>
    </div>
  );
}
