import FadeIn from "../ui/FadeIn";
import { services } from "@/data/profile";

const Services = () => {
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-brand-surface px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading font-display mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Services
        </h2>
      </FadeIn>
      <ol className="mx-auto max-w-5xl">
        {services.map((s, i) => (
          <li key={s.name} className="border-t border-brand-border last:border-b">
            <FadeIn delay={i * 0.1}>
              <div className="flex items-start gap-6 py-8 sm:gap-10 sm:py-10 md:py-12">
                <span
                  className="font-display font-black leading-none text-brand-text"
                  style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2 pt-2 md:pt-4">
                  <h3 className="font-display font-medium uppercase text-brand-text" style={{ fontSize: "clamp(1.1rem, 2.2vw, 2.1rem)" }}>
                    {s.name}
                  </h3>
                  <p className="max-w-2xl font-light leading-relaxed text-brand-muted" style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)" }}>
                    {s.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Services;
