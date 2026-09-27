import { IconBrandReact, IconBrandNextjs, IconBrandTypescript, IconBrandNodejs } from "@tabler/icons-react";
import FadeIn from "../ui/FadeIn";
import AnimatedText from "../ui/AnimatedText";
import { ContactButton } from "../ui/BrandButtons";
import { aboutText } from "@/data/profile";

const corners = [
  { Icon: IconBrandReact, label: "React", pos: "top-[4%] left-[2%] md:left-[6%]", x: -80, delay: 0.1 },
  { Icon: IconBrandNextjs, label: "Next.js", pos: "bottom-[8%] left-[4%] md:left-[10%]", x: -80, delay: 0.25 },
  { Icon: IconBrandTypescript, label: "TypeScript", pos: "top-[4%] right-[2%] md:right-[6%]", x: 80, delay: 0.15 },
  { Icon: IconBrandNodejs, label: "Node.js", pos: "bottom-[8%] right-[4%] md:right-[10%]", x: 80, delay: 0.3 },
];

const About = () => {
  return (
    <section id="about" className="relative flex min-h-screen flex-col items-center justify-center gap-16 overflow-x-clip px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10">
      {corners.map(({ Icon, label, pos, x, delay }) => (
        <div key={label} className={`absolute ${pos} hidden sm:block`} aria-hidden="true">
          <FadeIn delay={delay} x={x} y={0} duration={0.9}>
            <div className="flex h-24 w-24 items-center justify-center rounded-brand-lg border border-brand-border bg-brand-surface md:h-32 md:w-32">
              <Icon className="h-12 w-12 text-brand-accent-start md:h-16 md:w-16" stroke={1.25} />
            </div>
          </FadeIn>
        </div>
      ))}

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2
            className="hero-heading font-display text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            About me
          </h2>
        </FadeIn>
        <AnimatedText
          text={aboutText}
          className="max-w-[620px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-brand-text"
        />
      </div>

      <ContactButton href="#contact">Let&apos;s talk</ContactButton>
    </section>
  );
};

export default About;
