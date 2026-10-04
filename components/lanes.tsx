// Running-track lanes taken from the logo: navy on the left, orange on the right.
export function Lanes({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 440" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="split" x1="0" x2="1000" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0.5" stopColor="#18204a" />
          <stop offset="0.5" stopColor="#f26522" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={12 + i * 30} y={12 + i * 30} width={976 - i * 60} height={416 - i * 60} rx={208 - i * 30} stroke="url(#split)" strokeWidth="14" />
      ))}
    </svg>
  );
}
