interface SweetHomeLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "color" | "white";
}

export default function SweetHomeLogo({ size = "md", variant = "color" }: SweetHomeLogoProps) {
  const scales = { sm: 0.6, md: 1, lg: 1.5 };
  const scale = scales[size];
  const w = Math.round(160 * scale);
  const h = Math.round(56 * scale);

  const red = variant === "white" ? "#ffffff" : "#D72C2C";
  const green = variant === "white" ? "#d4f7d4" : "#2E7D32";

  return (
    <svg width={w} height={h} viewBox="0 0 160 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Sweet Home Pure Veg Garden Restaurant">
      {/* House icon */}
      <g transform="translate(64, 0)">
        {/* Roof (green) */}
        <polygon points="16,0 32,10 0,10" fill={green} />
        {/* Body (amber/gold) */}
        <rect x="3" y="10" width="26" height="12" fill={variant === "white" ? "#ffd580" : "#F9A825"} />
        {/* Door lines (dark) */}
        <rect x="3" y="13" width="26" height="2" fill={variant === "white" ? "#fff" : "#1a1a1a"} />
        <rect x="3" y="17" width="26" height="2" fill={variant === "white" ? "#fff" : "#1a1a1a"} />
      </g>
      {/* SWEET HOME */}
      <text
        x="80"
        y="38"
        textAnchor="middle"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="22"
        fill={red}
        letterSpacing="0.5"
      >
        SWEET HOME
      </text>
      {/* PURE VEG | GARDEN RESTAURANT */}
      <text
        x="80"
        y="51"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="7.5"
        fill={green}
        letterSpacing="0.8"
      >
        PURE VEG  |  GARDEN RESTAURANT
      </text>
    </svg>
  );
}
