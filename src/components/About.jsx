import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import Slider from "./Slider";

const About = () => {
    const bioText = `Designers, engineers and developers. Driven by smart ideas, clean design, and powerful technology. We’re digital builders, dedicated to turning real business needs into software that works.`;

    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Animate the title
            gsap.from(".title span", {
                y: "100%",
                duration: 0.6,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 50%",
                    end: "bottom 20%",
                    toggleActions: "play reverse play reverse",
                },
            });

            // Animate the bio (word by word)
            gsap.from(".bio p span", {
                y: "100%",
                duration: 0.6,
                stagger: 0.02,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 35%",
                    toggleActions: "play reverse play reverse",
                },
            });

        }, containerRef); 

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen p-4 lg:p-10">
            {/* heading */}
            <h2 className="text-3xl lg:text-4xl max-w-[950px] mt-10">
                <span className="inline-block text-xl font-medium -translate-y-5 mr-20 lg:mr-[400px] overflow-hidden title">
                    <span className="block text-2xl font-semibold">Who We Are</span>
                </span>

                {/* CHANGED: Adjusted to leading-snug for tighter overall spacing */}
                <span className="bio leading-snug">
                    {bioText.split(" ").map((word, idx) => (
                        // CHANGED: Reduced bottom margin to mb-1 lg:mb-2 for a much tighter line gap
                        <p key={idx} className="inline-block mr-2 mb-1 lg:mb-2 overflow-hidden">
                            <span className="block">{word}</span>
                        </p>
                    ))}
                </span>
            </h2>

            {/* img-slider  */}
            <Slider />
        </div>
    );
};

export default About;