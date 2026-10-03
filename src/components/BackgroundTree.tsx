import { useMemo } from "react";

/**
 * Fixed storybook backdrop: a windswept tree with a twisting trunk, flowing
 * branches and a swirling canopy of leaves, plus drifting leaves and twinkling stars.
 * Inspired by swirled, wind-blown tree paintings.
 *
 * Greens are the main colour, purples the secondary, with a few gold leaves.
 * Everything is generated from a seeded random function, so the scene is
 * identical on every render. The whole layer is kept faint so text stays readable.
 */

type Pt = { x: number; y: number };

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cubicPoint(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

const GREENS = ["#062B1B", "#1D6B47", "#2F8F5E"];
const PURPLES = ["#3E065E", "#6B2A96", "#8A4DB8"];
const GOLD = "#F2AE0E";

type Leaf = { x: number; y: number; s: number; rot: number; fill: string; o: number };
type Branch = { d: string; w: number };

function pickColor(rand: () => number) {
  const r = rand();
  if (r < 0.55) return GREENS[Math.floor(rand() * GREENS.length)];
  if (r < 0.92) return PURPLES[Math.floor(rand() * PURPLES.length)];
  return GOLD;
}

interface SceneConfig {
  w: number;
  h: number;
  k: number; // overall size multiplier
  baseX: number; // trunk x position
  branches: number;
  spiralLeaves: number;
  drifters: number;
  stars: number;
  seed: number;
}

function buildScene(c: SceneConfig) {
  const rand = mulberry32(c.seed);
  const { w, h, k } = c;
  const trunkTop = h * 0.52;
  const canopy: Pt = { x: c.baseX - 180 * k, y: trunkTop - 150 * k };
  const leaves: Leaf[] = [];
  const branches: Branch[] = [];

  const leaf = (x: number, y: number, size: number, rot: number): Leaf => ({
    x,
    y,
    s: size,
    rot,
    fill: pickColor(rand),
    o: 0.45 + rand() * 0.4,
  });

  // Main branches sweep up and mostly to the left, as if blown by wind.
  for (let i = 0; i < c.branches; i++) {
    const origin: Pt = { x: c.baseX + (rand() - 0.5) * 24 * k, y: trunkTop + rand() * 80 * k };
    const leftBias = rand() < 0.72;
    const deg = leftBias ? 195 + rand() * 70 : 285 + rand() * 55;
    const a = (deg * Math.PI) / 180;
    const len = (200 + rand() * 190) * k;
    const dir = { x: Math.cos(a), y: Math.sin(a) };
    const perp = { x: -dir.y, y: dir.x };
    const p1 = {
      x: origin.x + dir.x * len * 0.35 + perp.x * (rand() - 0.5) * 120 * k,
      y: origin.y + dir.y * len * 0.35 + perp.y * (rand() - 0.5) * 120 * k,
    };
    const p2 = {
      x: origin.x + dir.x * len * 0.7 + perp.x * (rand() - 0.5) * 160 * k,
      y: origin.y + dir.y * len * 0.7 + perp.y * (rand() - 0.5) * 160 * k,
    };
    const p3 = {
      x: origin.x + dir.x * len + perp.x * (rand() - 0.5) * 70 * k,
      y: origin.y + dir.y * len + perp.y * (rand() - 0.5) * 70 * k,
    };
    branches.push({
      d: `M ${origin.x} ${origin.y} C ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`,
      w: (6 + rand() * 4) * k,
    });

    // leaves hugging the branch
    for (let t = 0.5; t <= 1.001; t += 0.1) {
      const pt = cubicPoint(origin, p1, p2, p3, t);
      leaves.push(
        leaf(
          pt.x + (rand() - 0.5) * 40 * k,
          pt.y + (rand() - 0.5) * 40 * k,
          (9 + rand() * 12) * k,
          rand() * 360,
        ),
      );
    }

    // twigs
    for (let j = 0; j < 2; j++) {
      const t0 = 0.4 + rand() * 0.35;
      const start = cubicPoint(origin, p1, p2, p3, t0);
      const ta = a + ((rand() < 0.5 ? -1 : 1) * (25 + rand() * 25) * Math.PI) / 180;
      const tl = len * (0.3 + rand() * 0.2);
      const td = { x: Math.cos(ta), y: Math.sin(ta) };
      const tp = { x: -td.y, y: td.x };
      const q1 = {
        x: start.x + td.x * tl * 0.5 + tp.x * (rand() - 0.5) * 60 * k,
        y: start.y + td.y * tl * 0.5 + tp.y * (rand() - 0.5) * 60 * k,
      };
      const q2 = {
        x: start.x + td.x * tl + tp.x * (rand() - 0.5) * 40 * k,
        y: start.y + td.y * tl + tp.y * (rand() - 0.5) * 40 * k,
      };
      branches.push({
        d: `M ${start.x} ${start.y} Q ${q1.x} ${q1.y} ${q2.x} ${q2.y}`,
        w: 3 * k,
      });
      for (let t = 0.6; t <= 1.001; t += 0.2) {
        const pt = { x: start.x + (q2.x - start.x) * t, y: start.y + (q2.y - start.y) * t };
        leaves.push(
          leaf(
            pt.x + (rand() - 0.5) * 30 * k,
            pt.y + (rand() - 0.5) * 30 * k,
            (8 + rand() * 9) * k,
            rand() * 360,
          ),
        );
      }
    }
  }

  // Swirling canopy: three interleaved spiral arms of leaves.
  const radius = 330 * k;
  for (let i = 0; i < c.spiralLeaves; i++) {
    const arm = i % 3;
    const step = Math.floor(i / 3);
    const theta = step * 0.34 + (arm * 2 * Math.PI) / 3;
    const r = 24 * k + (step / (c.spiralLeaves / 3)) * radius;
    const size = (9 + rand() * 9) * k * (0.6 + (r / radius) * 0.9);
    leaves.push(
      leaf(
        canopy.x + Math.cos(theta) * r,
        canopy.y + Math.sin(theta) * r * 0.78,
        size,
        (theta * 180) / Math.PI + 90 + (rand() - 0.5) * 40,
      ),
    );
  }

  // Leaves blowing away on the wind.
  const drifters: Leaf[] = [];
  for (let i = 0; i < c.drifters; i++) {
    drifters.push({
      x: w * (0.08 + rand() * 0.8),
      y: h * (0.08 + rand() * 0.78),
      s: (5 + rand() * 5) * k,
      rot: rand() * 360,
      fill: pickColor(rand),
      o: 0.5 + rand() * 0.4,
    });
  }

  const stars = Array.from({ length: c.stars }, () => ({
    x: w * (0.05 + rand() * 0.9),
    y: h * (0.05 + rand() * 0.7),
    s: (3 + rand() * 5) * Math.max(k, 0.8),
    delay: rand() * 4,
    dur: 2.8 + rand() * 3,
  }));

  // Trunk outline (filled) + two twisting strands for a braided look.
  const bx = c.baseX;
  const tt = trunkTop;
  const trunk =
    `M ${bx - 38 * k} ${h + 10} ` +
    `C ${bx - 34 * k} ${h - 120 * k} ${bx - 66 * k} ${h - 210 * k} ${bx - 42 * k} ${tt + 70 * k} ` +
    `C ${bx - 30 * k} ${tt + 24 * k} ${bx - 28 * k} ${tt + 4 * k} ${bx - 14 * k} ${tt - 12 * k} ` +
    `L ${bx + 16 * k} ${tt - 12 * k} ` +
    `C ${bx + 30 * k} ${tt} ${bx + 22 * k} ${tt + 44 * k} ${bx + 46 * k} ${tt + 96 * k} ` +
    `C ${bx + 72 * k} ${h - 190 * k} ${bx + 34 * k} ${h - 110 * k} ${bx + 38 * k} ${h + 10} Z`;
  const strandA = `M ${bx - 20 * k} ${h} C ${bx + 34 * k} ${h - 100 * k} ${bx - 34 * k} ${h - 210 * k} ${bx + 14 * k} ${h - 300 * k} S ${bx - 18 * k} ${tt + 30 * k} ${bx} ${tt}`;
  const strandB = `M ${bx + 20 * k} ${h} C ${bx - 34 * k} ${h - 100 * k} ${bx + 34 * k} ${h - 210 * k} ${bx - 14 * k} ${h - 300 * k} S ${bx + 18 * k} ${tt + 30 * k} ${bx} ${tt}`;

  const hills = {
    back: `M 0 ${h} L 0 ${h - 70 * k} C ${w * 0.18} ${h - 110 * k} ${w * 0.38} ${h - 40 * k} ${w * 0.58} ${h - 80 * k} S ${w * 0.9} ${h - 112 * k} ${w} ${h - 70 * k} L ${w} ${h} Z`,
    front: `M 0 ${h} L 0 ${h - 36 * k} C ${w * 0.25} ${h - 70 * k} ${w * 0.5} ${h - 14 * k} ${w * 0.75} ${h - 44 * k} S ${w * 0.95} ${h - 54 * k} ${w} ${h - 34 * k} L ${w} ${h} Z`,
  };

  return { leaves, branches, drifters, stars, trunk, strandA, strandB, hills, canopy, k, w, h };
}

function leafPath(s: number) {
  return `M ${-s} 0 Q 0 ${-s * 0.62} ${s} 0 Q 0 ${s * 0.62} ${-s} 0 Z`;
}

function starPath(s: number) {
  const i = s * 0.28;
  return `M 0 ${-s} L ${i} ${-i} L ${s} 0 L ${i} ${i} L 0 ${s} L ${-i} ${i} L ${-s} 0 L ${-i} ${-i} Z`;
}

function Scene({
  scene,
  className,
  id,
}: {
  scene: ReturnType<typeof buildScene>;
  className: string;
  id: string;
}) {
  const { w, h, k } = scene;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMaxYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient
          id={`${id}-sun`}
          cx={scene.canopy.x}
          cy={scene.canopy.y}
          r={380 * k}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#F2CC0E" stopOpacity="0.13" />
          <stop offset="1" stopColor="#F2CC0E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft glow behind the canopy, like the swirling light in a painting */}
      <circle cx={scene.canopy.x} cy={scene.canopy.y} r={380 * k} fill={`url(#${id}-sun)`} />

      {/* rolling hills */}
      <path d={scene.hills.back} fill="#062B1B" opacity="0.5" />
      <path d={scene.hills.front} fill="#021E12" opacity="0.55" />

      {/* trunk + branches (greens) */}
      <g opacity="0.5">
        <path d={scene.trunk} fill="#062B1B" />
        <path
          d={scene.strandA}
          fill="none"
          stroke="#2F8F5E"
          strokeWidth={4 * k}
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d={scene.strandB}
          fill="none"
          stroke="#1D6B47"
          strokeWidth={4 * k}
          strokeLinecap="round"
          opacity="0.7"
        />
        {scene.branches.map((b, i) => (
          <path
            key={`b-${i}`}
            d={b.d}
            fill="none"
            strokeWidth={b.w}
            strokeLinecap="round"
            stroke={i % 2 === 0 ? "#1D6B47" : "#062B1B"}
          />
        ))}
      </g>

      {/* swirling canopy */}
      <g opacity="0.3">
        {scene.leaves.map((l, i) => (
          <path
            key={`l-${i}`}
            d={leafPath(l.s)}
            transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.rot.toFixed(0)})`}
            fill={l.fill}
            opacity={l.o}
          />
        ))}
      </g>

      {/* leaves drifting on the wind */}
      <g opacity="0.3">
        {scene.drifters.map((l, i) => (
          <g
            key={`d-${i}`}
            className="leaf-drift"
            style={{ animationDelay: `${(i % 7) * -1.6}s`, animationDuration: `${9 + (i % 5) * 2}s` }}
          >
            <path
              d={leafPath(l.s)}
              transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.rot.toFixed(0)})`}
              fill={l.fill}
              opacity={l.o}
            />
          </g>
        ))}
      </g>

      {/* twinkling stars */}
      <g opacity="0.5">
        {scene.stars.map((s, i) => (
          <path
            key={`s-${i}`}
            d={starPath(s.s)}
            transform={`translate(${s.x.toFixed(1)} ${s.y.toFixed(1)})`}
            fill="#F2CC0E"
            className="star-twinkle"
            style={{ animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

export function BackgroundTree() {
  const desktop = useMemo(
    () =>
      buildScene({
        w: 1200,
        h: 800,
        k: 1,
        baseX: 930,
        branches: 9,
        spiralLeaves: 210,
        drifters: 26,
        stars: 16,
        seed: 21,
      }),
    [],
  );
  // Simpler, smaller version for phones.
  const mobile = useMemo(
    () =>
      buildScene({
        w: 600,
        h: 900,
        k: 0.6,
        baseX: 450,
        branches: 6,
        spiralLeaves: 120,
        drifters: 12,
        stars: 9,
        seed: 5,
      }),
    [],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        opacity:
          "calc(var(--tree-opacity, 1) * (1 + (var(--sure, 0.4) - 0.4) * var(--tree-gain, 0.5)))",
      }}
      aria-hidden="true"
    >
      <Scene scene={desktop} id="tree-d" className="absolute inset-0 hidden h-full w-full md:block" />
      <Scene scene={mobile} id="tree-m" className="absolute inset-0 h-full w-full md:hidden" />
    </div>
  );
}
