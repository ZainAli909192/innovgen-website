import { cn } from "@/lib/utils";

type ConsultationVisualProps = {
  className?: string;
};

export function ConsultationVisual({ className }: ConsultationVisualProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate aspect-[1.08] min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-blue-200/20 bg-[var(--color-navy-950)] shadow-[0_28px_80px_rgb(0_0_0_/_30%),inset_0_1px_0_rgb(255_255_255_/_10%)] sm:min-h-[26rem]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_72%,rgb(47_130_245_/_34%),transparent_25%),radial-gradient(circle_at_22%_8%,rgb(104_40_96_/_48%),transparent_40%),linear-gradient(145deg,#06152f_0%,#071b3b_48%,#180d2d_100%)]" />
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(115deg,transparent_0%,rgb(112_177_255_/_10%)_45%,transparent_46%),linear-gradient(90deg,transparent_49%,rgb(143_193_255_/_10%)_50%,transparent_51%)] [background-size:100%_100%,4.5rem_100%]" />
      <div className="absolute -inset-x-1/4 bottom-[-22%] h-1/2 rotate-[-8deg] bg-[radial-gradient(ellipse_at_center,rgb(67_165_255_/_22%),transparent_64%)] blur-2xl" />
      <div className="absolute inset-x-8 top-7 flex items-center justify-between text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-blue-100/50 sm:inset-x-10 sm:top-9">
        <span>Connected systems</span>
        <span>01 / 05</span>
      </div>

      <svg
        viewBox="0 0 640 560"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="consultation-globe-fill" cx="50%" cy="40%" r="62%">
            <stop offset="0%" stopColor="#6fb9ff" stopOpacity="0.24" />
            <stop offset="58%" stopColor="#1769e0" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#050b18" stopOpacity="0.04" />
          </radialGradient>
          <linearGradient id="consultation-globe-stroke" x1="220" y1="250" x2="450" y2="450">
            <stop stopColor="#9ed5ff" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#4b9dff" stopOpacity="0.72" />
            <stop offset="1" stopColor="#c98bff" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="consultation-circuit-stroke" x1="40" y1="60" x2="600" y2="490">
            <stop stopColor="#73b7ff" stopOpacity="0.2" />
            <stop offset="0.45" stopColor="#9ed5ff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#c98bff" stopOpacity="0.42" />
          </linearGradient>
          <filter id="consultation-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="consultation-signal-line" stroke="url(#consultation-circuit-stroke)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-18 82 91 111l50 50 58 24v57l50 48v54" />
          <path d="M-26 204 80 229l36 38 75 18 34 48v57" />
          <path d="M132-16v73l47 47 14 70" />
          <path d="M258-20v97l53 47v77l-42 43v52" />
          <path d="M388-20v84l-50 54v93l-53 56" />
          <path d="M676 128 590 158l-49 63v64l-62 54-16 77" />
          <path d="M666 320 574 344l-58 63v74l-70 33" />
          <path d="M594 574v-70l-57-52-2-64" />
          <path d="M28 487 115 464l48-31 56 8 39-36" />
          <path d="M0 532h138l55-29 73 2" />
        </g>

        <g stroke="#b8dcff" strokeOpacity="0.45" strokeWidth="1">
          <path d="M72 0v114" />
          <path d="M105 0v92" />
          <path d="M520 0v122" />
          <path d="M560 0v167" />
          <path d="M604 0v92" />
          <path d="M25 405v78" />
          <path d="M604 383v104" />
        </g>

        <g className="consultation-globe" filter="url(#consultation-glow)">
          <circle cx="330" cy="356" r="109" fill="url(#consultation-globe-fill)" stroke="url(#consultation-globe-stroke)" strokeWidth="1.2" />
          <ellipse cx="330" cy="356" rx="109" ry="40" stroke="#a8d6ff" strokeOpacity="0.7" strokeWidth="1" />
          <ellipse cx="330" cy="356" rx="109" ry="75" stroke="#78b9ff" strokeOpacity="0.54" strokeWidth="1" />
          <ellipse cx="330" cy="356" rx="40" ry="109" stroke="#b3d9ff" strokeOpacity="0.6" strokeWidth="1" />
          <ellipse cx="330" cy="356" rx="73" ry="109" stroke="#78b9ff" strokeOpacity="0.52" strokeWidth="1" />
          <path d="M221 356h218M229 319c61 19 141 19 202 0M229 393c61-19 141-19 202 0" stroke="#9ed5ff" strokeOpacity="0.62" strokeWidth="1" />
          <path d="M265 262c-25 59-25 129 0 188M395 262c25 59 25 129 0 188" stroke="#b8ddff" strokeOpacity="0.42" strokeWidth="1" />
        </g>

        <g fill="#bfe4ff">
          <circle cx="91" cy="111" r="3.5" />
          <circle cx="141" cy="161" r="4" />
          <circle cx="258" cy="77" r="3.5" />
          <circle cx="311" cy="124" r="3" />
          <circle cx="541" cy="221" r="4" />
          <circle cx="516" cy="407" r="3.5" />
          <circle cx="163" cy="433" r="3.5" />
          <circle cx="115" cy="464" r="2.5" />
        </g>
        <g fill="#d9a6ff" fillOpacity="0.9">
          <circle cx="192" cy="262" r="3.5" />
          <circle cx="338" cy="131" r="3" />
          <circle cx="574" cy="344" r="3.5" />
          <circle cx="471" cy="484" r="3" />
        </g>
        <g fill="#f5fbff">
          <circle cx="91" cy="111" r="1.2" />
          <circle cx="541" cy="221" r="1.4" />
          <circle cx="330" cy="356" r="3" />
        </g>
      </svg>

      <div className="absolute bottom-6 start-6 flex items-center gap-3 rounded-full border border-blue-100/15 bg-navy-950/50 px-3 py-2 text-[0.62rem] font-medium tracking-[0.16em] text-blue-100/70 backdrop-blur-sm sm:bottom-8 sm:start-8">
        <span className="size-1.5 rounded-full bg-blue-300 shadow-[0_0_12px_rgb(131_185_255_/_90%)]" />
        <span>Signal online</span>
      </div>
      <div className="consultation-scanline pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-200/55 to-transparent" />
    </div>
  );
}
