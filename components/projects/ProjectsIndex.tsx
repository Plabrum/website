'use client';
import { ProjectType } from 'schemas/schema_types';
import Footer from 'components/homepage/Footer';
import HeaderComponent from 'components/homepage/header/Header';
import ProjectPage from './ProjectPage';
import { Suspense } from 'react';

interface ProjectsIndexProps {
  project: ProjectType;
}

export default function ProjectIndex({ project }: ProjectsIndexProps) {
  return (
    <Suspense>
      <HeaderComponent />
      <ProjectPage project={project} />
      <Footer />
    </Suspense>
  );
}
