import { ProjectType } from "schemas/schema_types";
import ProjectPage from "./ProjectPage";
import Footer from "components/homepage/Footer";
import HeaderComponent from "components/homepage/header/Header";

interface ProjectsIndexProps {
  project: ProjectType;
}

export default function ProjectIndex({ project }: ProjectsIndexProps) {
  return (
    <div>
      <HeaderComponent />
      <ProjectPage project={project} />
      <Footer />
    </div>
  );
}
