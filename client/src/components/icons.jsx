// Minimal, single-stroke icon set so no external icon library is required.
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconGlobe = () => (
  <svg viewBox="0 0 24 24" {...common}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z" />
  </svg>
);

export const IconLedger = () => (
  <svg viewBox="0 0 24 24" {...common}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);

export const IconScale = () => (
  <svg viewBox="0 0 24 24" {...common}>
    <path d="M12 3v18M5 7l-2 5a3 3 0 006 0L7 7zm12 0l-2 5a3 3 0 006 0l-2-5zM5 7h14M9 21h6" />
  </svg>
);

export const IconShield = () => (
  <svg viewBox="0 0 24 24" {...common}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const IconChart = () => (
  <svg viewBox="0 0 24 24" {...common}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);

export const IconBuilding = () => (
  <svg viewBox="0 0 24 24" {...common}>
    <path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6M4 21h16" />
  </svg>
);

export const IconTransfer = () => (
  <svg viewBox="0 0 24 24" {...common}>
    <path d="M7 7h11l-3-3M17 17H6l3 3M4 12h16" />
  </svg>
);

export const IconUser = () => (
  <svg viewBox="0 0 24 24" {...common}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

export const IconGavel = () => (
  <svg viewBox="0 0 24 24" {...common}>
    <path d="M14 4l6 6M5 13l6 6M2 22h9M9 7l8 8M3 21l4-4" />
  </svg>
);
