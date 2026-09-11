import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate top footer columns
      tl.from(".footer-col", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
      });

      // Animate big DEVCORE per letter
      tl.from(
        ".footer-title span",
        {
          yPercent: 120,
          opacity: 0,
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.04,
        },
        "-=0.2"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-[999] box-border w-screen max-w-[100vw] min-h-screen flex flex-col justify-between p-6 md:p-12 pb-4 bg-black text-white overflow-hidden"
    >
      {/* Top footer content */}
      <div className="w-full min-w-0 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-8 text-sm text-gray-400">
        {/* Brand & Inquiries */}
        <div className="footer-col min-w-0 space-y-4">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            Inquiries
          </p>
          <div>
            <p className="text-white font-medium">New Projects</p>
            <a
              href="mailto:projects@devcore.tech"
              className="break-all hover:text-white transition-colors duration-200"
            >
              projects@devcore.tech
            </a>
          </div>
          <div>
            <p className="text-white font-medium">General Chat</p>
            <a
              href="mailto:hello@devcore.tech"
              className="break-all hover:text-white transition-colors duration-200"
            >
              hello@devcore.tech
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="footer-col min-w-0 space-y-3">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            Expertise
          </p>
          <ul className="space-y-2">
            <li>
              <a href="#services" className="hover:text-white transition-colors">
                POS Solutions
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-white transition-colors">
                Business Websites
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-white transition-colors">
                Custom Software
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-white transition-colors">
                Web Applications
              </a>
            </li>
          </ul>
        </div>

        {/* Socials & Profiles */}
        <div className="footer-col min-w-0 space-y-3">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            Connect
          </p>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                GitHub
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                X / Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Discord
              </a>
            </li>
          </ul>
        </div>

        {/* Project Call to Action */}
        <div className="footer-col min-w-0 space-y-4">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            Have an idea?
          </p>
          <p className="text-sm text-gray-300">
            Let’s build intelligent, scalable software that moves your business forward.
          </p>
          <a
            href="mailto:projects@devcore.tech"
            className="inline-block px-5 py-2.5 rounded-full border border-gray-700 text-white text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            Start a Project →
          </a>
        </div>
      </div>

      {/* Bottom giant branded text */}
      <div className="mt-16 sm:mt-20 select-none">
        <h2 className=" text-[15vw] font-bold text-center tracking-tighter text-white leading-none overflow-hidden will-change-transform">
          {"DEVCORE".split("").map((ch, idx) => (
            <span key={idx} className="inline-block overflow-hidden">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h2>

        {/* Bottom copyright bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4 mt-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} DEVCORE. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for new opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;