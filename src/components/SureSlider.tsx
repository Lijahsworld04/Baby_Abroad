import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ornament } from "@/components/Ornament";
import { setSureness, useSureness } from "@/lib/sureness";

const STEPS = [
  { v: 0, line: "Just curious. That counts, and you're welcome here." },
  { v: 20, line: "Daydreaming about it. Totally valid. Let the idea breathe." },
  { v: 40, line: "Doing your research. This is where every story starts." },
  { v: 60, line: "It's getting real, and you're asking the right questions." },
  { v: 80, line: "Almost there. Time to make a plan you can trust." },
  { v: 100, line: "You're ready. Go write your story." },
];

export function SureSlider() {
  const value = useSureness();
  const step = STEPS.find((s) => s.v === value) ?? STEPS[2];

  return (
    <section className="py-12 md:py-16" aria-labelledby="sure-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-6 text-center sm:p-10">
            <h2 id="sure-heading" className="text-2xl font-bold md:text-3xl">
              How sure are you about moving abroad?
            </h2>
            <Ornament className="mt-3" />
            <p className="mt-3 text-muted-foreground">
              No wrong answer. Slide it and watch the world around you change.
            </p>

            <div className="mt-8 px-1">
              <input
                type="range"
                min={0}
                max={100}
                step={20}
                value={value}
                onChange={(e) => setSureness(Number(e.target.value))}
                className="sure-range"
                aria-label="How sure are you about moving abroad?"
                aria-valuetext={`${value} percent sure. ${step.line}`}
                list="sure-ticks"
              />
              <datalist id="sure-ticks">
                {STEPS.map((s) => (
                  <option key={s.v} value={s.v} />
                ))}
              </datalist>
              <div className="mt-3 flex justify-between text-sm text-muted-foreground" aria-hidden="true">
                {STEPS.map((s) => (
                  <span key={s.v} className={s.v === value ? "font-bold text-highlight" : ""}>
                    {s.v}%
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 min-h-[3rem] font-script text-2xl text-highlight md:text-3xl" aria-live="polite">
              {step.line}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Want to explore at your own pace?{" "}
              <Link to="/guides" className="text-primary underline underline-offset-4">
                Read our free guides
              </Link>
              .
            </p>
            <div className="mt-6 border-t border-primary/15 pt-6">
              <p className="font-semibold">Not sure where to go? Let us match you.</p>
              <Link to="/quiz" className="mt-3 inline-block">
                <Button size="lg" className="bg-gold text-[#1B1203] hover:bg-gold/85">
                  Take the Free Match Quiz
                </Button>
              </Link>
              <p className="mt-2 text-xs text-muted-foreground">Free to take. Your top country match is on us.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
