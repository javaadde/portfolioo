import { cn } from "@/lib/utils";

type InitialsLogoProps = {
  className?: string;
};

export default function InitialsLogo({ className }: InitialsLogoProps) {
  return (
    <div
      className={cn("inline-flex items-center text-[#1a1a1a]", className)}
      aria-label="JD"
    >
      <svg
        viewBox="0 0 52 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        aria-hidden="true"
      >
        <path
          d="M4 4H18V8.4H13.2V18.6C13.2 23.1 10.2 25.5 5.8 25.5H2.6V21.2H4.9C7.2 21.2 8.6 20.2 8.6 17.9V8.4H4V4Z"
          fill="currentColor"
        />
        <path
          d="M20.5 4H30.6C39.9 4 46.4 8.4 46.4 14.8C46.4 21.1 39.9 25.5 30.6 25.5H20.5V4Z"
          fill="currentColor"
        />
        <path
          d="M25.7 8.4H30.1C36.2 8.4 41 10.7 41 14.8C41 18.8 36.2 21.2 30.1 21.2H25.7V8.4Z"
          fill="var(--background)"
        />
        <rect x="6.3" y="13.1" width="8.5" height="3.6" rx="1.8" fill="var(--background)" />
        <rect x="17.7" y="13.1" width="4" height="3.6" rx="1.8" fill="var(--background)" />
      </svg>
    </div>
  );
}
