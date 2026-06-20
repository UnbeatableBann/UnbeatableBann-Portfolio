import { useState, useEffect } from "react";

// Option 1: Existing day-of-week greeting option
export function HeroGreetingOption() {
  const [dayOfWeek, setDayOfWeek] = useState("");

  useEffect(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    setDayOfWeek(days[today]);
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-[#d1ebd9] bg-[#f2fbf7] px-5 py-2 text-xs text-[#205c46] font-semibold shadow-sm w-[255px] h-[36px] shrink-0 overflow-hidden relative select-none">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[#309c7d] opacity-85"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#309c7d]"></span>
      </span>
      <span className="truncate">
        Hey! there, How's your{" "}
        {dayOfWeek ? (
          <span
            className="bg-clip-text text-transparent font-bold tracking-tight"
            style={{ backgroundImage: "linear-gradient(120deg, #2d8a6b 10%, #99ab18 90%)" }}
          >
            {dayOfWeek}
          </span>
        ) : (
          "day"
        )}
        ?
      </span>
    </div>
  );
}

// Option 2: Thought stream ticker option
const thoughts = [
  "Shipping fast, learning faster...",
  "Deploying on a Friday? Let's go! 🚀",
  "Agentic workflows are the new hotness.",
  "Coffee in, functional intelligence out.",
  "Refactoring is a love letter to the future.",
  "Ship fast, iterate in production.",
  "Why do manually what you can automate?",
  "Building tools for agents to use.",
];

export function HeroThoughtStreamOption() {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"visible" | "exit" | "enter">("visible");

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Start exit transition
      setFadeState("exit");

      // 2. After exit transition completes (300ms), change text and prepare entry from below
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % thoughts.length);
        setFadeState("enter");

        // 3. Immediately trigger entry transition to visible
        setTimeout(() => {
          setFadeState("visible");
        }, 50);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getTransitionClass = () => {
    switch (fadeState) {
      case "exit":
        return "opacity-0 -translate-y-2 transition-all duration-300 ease-in-out";
      case "enter":
        return "opacity-0 translate-y-2 transition-none";
      case "visible":
      default:
        return "opacity-100 translate-y-0 transition-all duration-300 ease-out";
    }
  };

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-[#d1ebd9] bg-[#f2fbf7] px-5 py-2 text-xs text-[#205c46] font-semibold shadow-sm w-[315px] h-[36px] shrink-0 overflow-hidden relative select-none">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[#309c7d] opacity-85"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#309c7d]"></span>
      </span>
      <span className={`truncate w-full text-left ${getTransitionClass()}`}>{thoughts[index]}</span>
    </div>
  );
}

// Option 3: Sailing/sinking ship animation option
export function HeroBoatAnimationOption() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-[#d1ebd9] bg-[#f2fbf7] px-5 py-2 text-xs text-[#205c46] font-semibold shadow-sm w-[315px] h-[36px] shrink-0 overflow-hidden relative select-none">
      <style>{`
        @keyframes boat-sail-and-sink {
          /* Cycle 1: Succeeds (0s to 4s) */
          0% {
            left: 5px;
            top: 10px;
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          3% {
            opacity: 1;
          }
          8% {
            left: 20px;
            top: 2px;
            transform: translate(-50%, -50%) rotate(-12deg);
          }
          16% {
            left: 50px;
            top: 18px;
            transform: translate(-50%, -50%) rotate(12deg);
          }
          24% {
            left: 80px;
            top: 2px;
            transform: translate(-50%, -50%) rotate(-12deg);
          }
          30% {
            left: 102px;
            top: 18px;
            transform: translate(-50%, -50%) rotate(12deg);
            opacity: 1;
          }
          33% {
            left: 110px;
            top: 10px;
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 1;
          }
          35% {
            left: 110px;
            top: 10px;
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 0;
          }

          /* Cycle 2: Sinks (4s to 8s) */
          38% {
            left: 5px;
            top: 10px;
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          41% {
            opacity: 1;
          }
          46% {
            left: 20px;
            top: 2px;
            transform: translate(-50%, -50%) rotate(-12deg);
          }
          52% {
            left: 35px;
            top: 10px;
            transform: translate(-50%, -50%) rotate(15deg);
            opacity: 1;
          }
          56% {
            left: 45px;
            top: 15px;
            transform: translate(-50%, -50%) rotate(45deg);
            opacity: 0.8;
          }
          60% {
            left: 50px;
            top: 28px;
            transform: translate(-50%, -50%) rotate(90deg);
            opacity: 0;
          }
          68% {
            left: 50px;
            top: 28px;
            opacity: 0;
          }

          /* Cycle 3: Succeeds again (8s to 12s) */
          71% {
            left: 5px;
            top: 10px;
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          74% {
            opacity: 1;
          }
          79% {
            left: 20px;
            top: 2px;
            transform: translate(-50%, -50%) rotate(-12deg);
          }
          87% {
            left: 50px;
            top: 18px;
            transform: translate(-50%, -50%) rotate(12deg);
          }
          93% {
            left: 80px;
            top: 2px;
            transform: translate(-50%, -50%) rotate(-12deg);
          }
          97% {
            left: 102px;
            top: 18px;
            transform: translate(-50%, -50%) rotate(12deg);
            opacity: 1;
          }
          99% {
            left: 110px;
            top: 10px;
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 1;
          }
          100% {
            left: 110px;
            top: 10px;
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 0;
          }
        }

        .animate-boat-sail {
          animation: boat-sail-and-sink 12s linear infinite;
        }
      `}</style>

      {/* Indicator Dot */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[#309c7d] opacity-85"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#309c7d]"></span>
      </span>

      {/* Label Text */}
      <span className="shrink-0 select-none">AI behavior: Ship fast</span>

      {/* Sailing Animation Area */}
      <div className="relative w-[110px] h-[20px] overflow-visible ml-1 flex-1">
        {/* Wave path SVG */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" fill="none">
          <path
            d="M 5,10 Q 20,2 35,10 T 65,10 T 95,10 T 110,10"
            stroke="#c3ebd1"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />
        </svg>

        {/* Paper boat SVG animated */}
        <div className="absolute animate-boat-sail text-[#2d8a6b] w-4.5 h-4.5 pointer-events-none">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2.5L2 14.5L12 17.5L22 14.5L12 2.5Z" />
            <path d="M12 17.5L2 14.5L12 21.5L22 14.5L12 17.5Z" opacity="0.8" />
            <path d="M12 2.5V17.5" opacity="0.6" stroke="white" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}
