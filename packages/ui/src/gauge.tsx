import { cn } from "@logicate/ui";

const sizes = {
  small: {
    width: "36",
    height: "36",
    textSize: "text-xs",
  },
  medium: {
    width: "72",
    height: "72",
    textSize: "text-lg",
  },
  large: {
    width: "144",
    height: "144",
    textSize: "text-3xl",
  },
};

export function Gauge({
  value,
  size = "small",
  showValue = false,
  showPercent = false,
}: {
  value: number;
  size: keyof typeof sizes;
  showValue?: boolean;
  showPercent?: boolean;
}) {
  const circumference = 332; // 2 * Math.PI * 53; // 2 * pi * radius;
  const valueInCircumference = (value / 100) * circumference;
  const strokeDasharray = `${circumference} ${circumference}`;
  const initialOffset = circumference;
  const strokeDashoffset = initialOffset - valueInCircumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg
        fill="none"
        shapeRendering="crispEdges"
        height={sizes[size].height}
        width={sizes[size].width}
        viewBox="0 0 120 120"
        strokeWidth="2"
        className="-rotate-90"
      >
        <circle
          strokeWidth="12"
          className="dark:text-neutralgrey-1100 text-[#D1D1D1]"
          stroke="currentColor"
          fill="transparent"
          shapeRendering="geometricPrecision"
          r="53"
          cx="60"
          cy="60"
        />
        <circle
          className="animate-gauge_fill text-[#2AE05D]"
          strokeWidth="12"
          stroke="currentColor"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={initialOffset}
          fill="transparent"
          shapeRendering="geometricPrecision"
          r="53"
          cx="60"
          cy="60"
          style={{
            strokeDashoffset,
            transition: "stroke-dasharray 1s ease 0s, stroke 1s ease 0s",
          }}
          strokeLinecap="round"
        />
      </svg>
      {showValue ? (
        <div className="animate-gauge_fadeIn absolute flex">
          <p
            className={cn(
              "text-neutralgrey-1200 dark:text-neutralgrey-100 font-semibold",
              sizes[size].textSize,
            )}
          >
            {value}
            {showPercent ? "%" : ""}
          </p>
        </div>
      ) : null}
    </div>
  );
}
