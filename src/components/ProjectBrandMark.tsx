import Image from "next/image";
import hayonLogo from "@/assets/project-logos/hayon.webp";

type ProjectBrandMarkProps = {
  slug: string;
  className?: string;
};

export default function ProjectBrandMark({
  slug,
  className = "",
}: ProjectBrandMarkProps) {
  if (slug !== "hayon") {
    return (
      <div
        aria-hidden="true"
        className={`flex items-center gap-[3px] ${className}`}
      >
        <span className="h-full flex-1 rounded-l-full rounded-r-[3px] bg-accent" />
        <span className="h-full flex-1 rounded-l-[3px] rounded-r-full bg-accent" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={hayonLogo}
        alt="Hayon logo"
        fill
        className="object-contain"
        sizes="58px"
      />
    </div>
  );
}
