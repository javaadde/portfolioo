import Image from "next/image";
import hayonLogo from "@/assets/project-logos/hayon.webp";
import trendzyLogo from "@/assets/project-logos/trendzy.png";

type ProjectBrandMarkProps = {
  slug: string;
  className?: string;
};

export default function ProjectBrandMark({
  slug,
  className = "",
}: ProjectBrandMarkProps) {
  const logos = {
    hayon: {
      src: hayonLogo,
      alt: "Hayon logo",
    },
    trendzy: {
      src: trendzyLogo,
      alt: "Trendzy logo",
    },
  } as const;
  const logo = logos[slug as keyof typeof logos];

  if (!logo) {
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
        src={logo.src}
        alt={logo.alt}
        fill
        className="object-contain"
        sizes="58px"
      />
    </div>
  );
}
