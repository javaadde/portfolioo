import { notFound } from "next/navigation";
import {
  getSelectedProject,
  selectedProjects,
} from "@/data/selectedProjects";
import ProjectDetailStory from "@/components/ProjectDetailStory";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return selectedProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getSelectedProject(slug);

  if (!project) {
    return {
      title: "Project not found | Javad",
    };
  }

  return {
    title: `${project.title} | Selected Work`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getSelectedProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-background px-4 pb-24 pt-[72px] text-foreground sm:px-6 md:px-12 lg:px-16"
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="h-full w-full grid-background opacity-50" />
      </div>
      <div className="vignette-glow" />

      <ProjectDetailStory project={project} />
    </div>
  );
}
