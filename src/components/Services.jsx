import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useRef } from "react";

const services = [
  {
    id: 1,
    title: "POS Solutions",
    description:
      "Streamline your sales and inventory with modern, fast, and secure Point of Sale systems tailored for your business.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop", 
    },
    services: [
      ["Retail POS", "Restaurant POS", "Inventory Management", "Sales Tracking"],
      ["Payment Integration", "Analytics Dashboard", "Cloud Sync", "Hardware Setup"],
    ],
  },
  {
    id: 2,
    title: "Business Websites",
    description:
      "Professional, responsive, and SEO-optimized websites designed to establish your digital presence and drive engagement.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", 
    },
    services: [
      ["Corporate Websites", "Landing Pages", "SEO Optimization", "Web design"],
      ["CMS Integration", "Responsive Design", "Web Hosting", "Maintenance"],
    ],
  },
  {
    id: 3,
    title: "Custom Software",
    description:
      "Bespoke software solutions built from the ground up to solve your unique business challenges and automate workflows.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop", 
    },
    services: [
      ["Enterprise Software", "CRM Systems", "Workflow Automation"],
      ["API Development", "Legacy Upgrades", "Cloud Solutions", "Support"],
    ],
  },
  {
    id: 4,
    title: "Web Applications",
    description:
      "Scalable and interactive web applications engineered for performance, security, and exceptional user experiences.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
    },
    services: [
      ["Frontend Development", "Backend Systems", "SaaS Platforms"],
      ["Database Design", "Real-time Apps", "Performance Tuning"],
    ],
  },
];

const Work = () => {
  const containerRef = useRef(null);
  const slideRefs = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const slides = slideRefs.current.filter(Boolean);
      const images = slides.map((slide) =>
        slide.querySelector(".service-image")
      );

      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });
      gsap.set(images, {
        scale: 1,
        opacity: 1,
        transformOrigin: "center center",
      });
      gsap.set(images.slice(1), { scale: 1.2 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (services.length - 1)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      slides.slice(1).forEach((slide, index) => {
        const previousSlide = slides[index];
        const step = index;

        timeline
          .to(
            previousSlide.querySelector(".service-copy"),
            {
              y: 40,
              opacity: 0,
              scale: 0.98,
              duration: 0.45,
              ease: "power2.in",
            },
            step
          )
          .to(
            previousSlide.querySelector(".service-image"),
            {
              opacity: 0,
              scale: 0.96,
              duration: 0.9,
              ease: "power1.inOut",
            },
            step
          )
          .to(previousSlide, { autoAlpha: 0, duration: 0.01 }, step + 0.9)
          .fromTo(
            slide,
            { autoAlpha: 0, y: -40 },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
            step + 0.45
          )
          .fromTo(
            slide.querySelector(".service-copy"),
            { y: -40, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: "power2.out",
            },
            step + 0.45
          )
          .to(
            images[index + 1],
            {
              scale: 1,
              duration: 0.65,
              ease: "power1.inOut",
            },
            step + 0.4
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-[400] h-screen overflow-hidden bg-white text-black"
    >
      <div className="relative mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-4 px-4 py-6 sm:gap-8 sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-16">
        {services.map((service, index) => (
          <ServiceSlide
            key={service.id}
            slideRef={(element) => {
              slideRefs.current[index] = element;
            }}
            {...service}
          />
        ))}
      </div>
    </section>
  );
};

export default Work;

const ServiceSlide = ({
  id,
  title,
  description,
  media,
  services,
  slideRef,
}) => {
  return (
    <article
      ref={slideRef}
      className="absolute inset-0 grid grid-cols-1 gap-4 overflow-hidden px-4 py-6 sm:gap-8 sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-16"
    >
      <div className="service-copy flex min-h-0 flex-col justify-start lg:justify-center lg:pr-8">
        <span className="mb-2 text-xs font-medium tracking-[0.25em] text-black/45 sm:mb-5 sm:text-sm">
          {String(id).padStart(2, "0")}
        </span>
        <h2 className="max-w-xl font-sans text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          {title}
        </h2>
        <a
          href="#contact"
          className="mt-4 inline-flex w-fit items-center gap-3 rounded-full border border-black bg-black px-5 py-2.5 text-[10px] font-semibold tracking-[0.16em] text-white shadow-lg shadow-black/10 transition-transform duration-300 hover:-translate-y-1 sm:mt-8 sm:px-6 sm:py-3 sm:text-xs"
        >
          REQUEST PROJECT
          <ArrowUpRight size={18} strokeWidth={2} />
        </a>
        <p className="mt-4 max-w-lg text-sm leading-6 text-black/65 sm:mt-8 sm:text-lg sm:leading-7">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-black/55 sm:mt-8 sm:gap-x-8 sm:gap-y-2 sm:text-sm">
          {services.flat().map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 items-center justify-center">
        <div className="h-[24vh] max-h-[680px] min-h-[150px] w-full overflow-hidden rounded-3xl bg-black/5 sm:h-[42vh] lg:h-[58vh] lg:min-h-[360px]">
          <img
            src={media.url}
            alt={title}
            className="service-image h-full w-full object-cover"
          />
        </div>
      </div>
    </article>
  );
};