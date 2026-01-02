import { Metadata } from 'next'
import ProjectsPageClient from './ProjectsPageClient'

export const metadata: Metadata = {
  title: 'Engineering Projects | Exact Solutions Limited',
  description: 'Technical case studies of precision engineering across East Africa. Explore our solutions in energy, containers, and Building & Construction.',
}

export default function ProjectsPage() {
  return <ProjectsPageClient />
}

