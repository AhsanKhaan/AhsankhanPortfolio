import { IconTruckDelivery, IconBuildingBank, IconCheck } from "@tabler/icons-react";
import FadeIn from "../ui/FadeIn";
import { domainFit } from "@/data/profile";

const icons = [IconTruckDelivery, IconBuildingBank];

const DomainFit = () => {
  return (
    <section id="domain-fit" className="px-5 py-20 sm:px-8 md:px-10">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-display mb-4 text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 8vw, 110px)" }}
        >
          Domain fit
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-lg text-brand-muted">
          Experience that maps directly onto delivery, marketplace and fintech platforms.
        </p>
      </FadeIn>
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
        {domainFit.map((d, i) => {
          const Icon = icons[i];
          return (
            <FadeIn key={d.title} delay={i * 0.1} className="h-full">
              <article className="h-full rounded-brand-xl border border-brand-border bg-brand-surface p-6 sm:p-8 md:p-10">
                <Icon className="mb-5 h-10 w-10 text-brand-accent-end" stroke={1.5} aria-hidden="true" />
                <h3 className="font-display text-2xl font-medium uppercase text-brand-text md:text-3xl">{d.title}</h3>
                <p className="mb-6 mt-1 text-sm uppercase tracking-widest text-brand-muted">{d.audience}</p>
                <ul className="space-y-3">
                  {d.points.map((p) => (
                    <li key={p} className="flex gap-3 text-brand-text">
                      <IconCheck size={20} className="mt-0.5 shrink-0 text-brand-accent-start" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

export default DomainFit;
