import { cn } from "@/lib"

export default function LogicGateIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("text-black", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 9H3.5M3.5 9V6.5L7.5 9M3.5 9V11.5L7.5 9M7.5 9H12M12 9V6.5H15.5C16.8333 6.5 19.5 7.3 19.5 10.5M12 9V12M19.5 10.5C19.5 13.7 16.8333 14.5 15.5 14.5H12V12M19.5 10.5H22.5M12 12H9V18H4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
