import { companyEvidence } from "@/config/company-evidence";
import { SpatialItem } from "@/components/motion/spatial-section";

export function CompanyEvidence() {
  return (
    <ol className="relative border-t border-border">
      {companyEvidence.map((item, index) => (
        <li
          key={item.number}
          className="group/module grid gap-3 border-b border-border py-6 focus-visible:outline-offset-4 sm:grid-cols-[3rem_1fr] md:py-7"
          tabIndex={0}
        >
          <span className="font-mono text-xs font-semibold tracking-[0.18em] text-accent">
            {item.number}
          </span>
          <SpatialItem index={index}>
            <div className="transition-[transform,filter] duration-[var(--duration-standard)] group-hover/module:[transform:translateZ(8px)] group-focus-visible/module:[transform:translateZ(8px)] group-hover/module:brightness-110 group-focus-visible/module:brightness-110 motion-reduce:transform-none">
              <h3 className="text-xl font-semibold md:text-2xl">{item.title}</h3>
              <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-muted md:text-base">
                {item.description}
              </p>
            </div>
          </SpatialItem>
        </li>
      ))}
    </ol>
  );
}
