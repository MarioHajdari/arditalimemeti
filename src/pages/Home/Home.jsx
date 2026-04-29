import PageTransition from '../../components/PageTransition/PageTransition';
import HeroVideo from '../../components/HeroVideo/HeroVideo';
import ProjectGrid from '../../components/ProjectGrid/ProjectGrid';
import Footer from '../../components/Footer/Footer';
import projects from '../../data/projects';

const taglines = [
  "Where Bold Vision Meets Cinematic Craft.",
  "Crafting Visual Identities for Independent Cinema and Beyond.",
  "Multimedia Producer, Video Editor, & Visual Storyteller.",
];

export default function Home() {
  // Hero video ID
  const heroVideoId = '1154270336';

  return (
    <PageTransition>
      <main>
        <h1 className="sr-only">Ardit Alimemeti | Filmmaker and Visual Storyteller Portfolio</h1>
        <HeroVideo videoId={heroVideoId} taglines={taglines} />
        <ProjectGrid projects={projects} />
      </main>
      <Footer />
    </PageTransition>
  );
}
