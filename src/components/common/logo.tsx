import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["600"],
});

const LOGO_BASE_COLOR = "#8B5A67";
const LOGO_HIGHLIGHT_COLOR = "#5C2A35";

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  return (
   <span
  className={cn(
    playfairDisplay.className,
    "uppercase tracking-[0.06em] flex flex-col md:flex-row",
    className
  )}
>
  <span style={{ color: LOGO_BASE_COLOR }}>{"LABEL"}</span>

  <span className="whitespace-nowrap">
    <span style={{ color: LOGO_BASE_COLOR }}>BYR</span>
    <span style={{ color: LOGO_HIGHLIGHT_COLOR }}>H</span>
    <span style={{ color: LOGO_BASE_COLOR }}>A</span>
  </span>
</span>
  );
}

export { Logo };
