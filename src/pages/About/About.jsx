import { motion } from 'framer-motion';
import { Film, Palette, Lightbulb, Layers } from 'lucide-react';
import PageTransition from '../../components/PageTransition/PageTransition';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import Footer from '../../components/Footer/Footer';
import arditPortrait from '../../assets/images/ardit-portrait.jpeg';
import styles from './About.module.css';

const services = [
  {
    icon: Film,
    title: 'Cinematic Editing',
    description: 'Creating high-impact narratives with aesthetic precision.',
  },
  {
    icon: Palette,
    title: 'Art Direction',
    description: 'Defining the visual soul and consistency of a project.',
  },
  {
    icon: Lightbulb,
    title: 'Creative Development',
    description: 'Guiding projects from early-stage concepts to production-ready scripts.',
  },
  {
    icon: Layers,
    title: 'Multimedia Design',
    description: 'Integrating photography and graphic design into a unified visual identity.',
  },
];

export default function About() {
  return (
    <PageTransition>
      <main className={styles.about}>
        {/* ── Hero Section ──────────────────────────── */}
        <section className={styles.hero} aria-label="About Ardit Alimemeti">
          <div className={`container ${styles.heroContainer}`}>
            {/* Portrait */}
            <motion.div
              className={styles.portraitWrap}
              initial={{ opacity: 0, x: -60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.portraitFrame}>
                <img
                  src={arditPortrait}
                  alt="Ardit Alimemeti on set with camera equipment"
                  className={styles.portrait}
                />
                <div className={styles.portraitOverlay} />
              </div>
              {/* Decorative elements */}
              <div className={styles.portraitAccent} />
              <div className={styles.portraitLine} />
            </motion.div>

            {/* Bio Intro */}
            <motion.div
              className={styles.heroText}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label">About</span>
              <h1 className={styles.heroHeading}>
                The eye behind<br />
                <em>the lens</em>
              </h1>
              <p className={styles.heroSubtext}>
                Multimedia Producer · Video Editor · Visual Storyteller
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Story Sections ────────────────────────── */}
        <section className={styles.story}>
          <div className={`container ${styles.storyContainer}`}>
            {/* Identity & Craft */}
            <ScrollReveal delay={0}>
              <div className={styles.storyBlock}>
                <div className={styles.storyLabel}>
                  <span className={styles.storyNumber}>01</span>
                  <span className="label">Identity & Craft</span>
                </div>
                <div className={styles.storyContent}>
                  <p className={styles.storyText}>
                    Ardit Alimemeti is a multimedia architect and visual creator with an artistic
                    foundation in multimedia and a sharp edge sharpened by years in national and
                    international journalism. He specializes in crafting audiovisual content with
                    a definitive identity—blending the rhythm of storytelling with a rigorous eye
                    for visual composition.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Cinema & Production */}
            <ScrollReveal delay={0.1}>
              <div className={styles.storyBlock}>
                <div className={styles.storyLabel}>
                  <span className={styles.storyNumber}>02</span>
                  <span className="label">Cinema & Production</span>
                </div>
                <div className={styles.storyContent}>
                  <p className={styles.storyText}>
                    As a core member of Papadhimitri Production, Ardit is part of the new wave
                    of Albanian independent cinema. His work serves as a bridge between the local
                    film landscape and international industry platforms, focusing on project
                    development from the first creative spark to final execution.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Technical Mastery */}
            <ScrollReveal delay={0.1}>
              <div className={styles.storyBlock}>
                <div className={styles.storyLabel}>
                  <span className={styles.storyNumber}>03</span>
                  <span className="label">Technical Mastery</span>
                </div>
                <div className={styles.storyContent}>
                  <p className={styles.storyText}>
                    His portfolio is a testament to visual coherence. Whether through video editing,
                    photography, or art direction, Ardit builds narratives that don't just look
                    good—they resonate. He is dedicated to strengthening the visibility of Balkan
                    cinema, one frame at a time.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Services / Expertise ──────────────────── */}
        <section className={styles.services} aria-label="Expertise and services">
          <div className={`container`}>
            <ScrollReveal>
              <div className={styles.servicesHeader}>
                <span className="label">Expertise</span>
                <h2 className={styles.servicesHeading}>
                  What I <em>do</em>
                </h2>
              </div>
            </ScrollReveal>

            <div className={styles.servicesGrid}>
              {services.map((service, index) => (
                <ScrollReveal key={service.title} delay={index * 0.1}>
                  <motion.div
                    className={styles.serviceCard}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className={styles.serviceIconWrap}>
                      <service.icon
                        size={28}
                        strokeWidth={1.2}
                        className={styles.serviceIcon}
                      />
                    </div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDesc}>{service.description}</p>
                    <div className={styles.serviceNumber}>{String(index + 1).padStart(2, '0')}</div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quote ─────────────────────────────────── */}
        <section className={styles.quoteSection}>
          <div className={`container ${styles.quoteContainer}`}>
            <ScrollReveal>
              <blockquote className={styles.quote}>
                <span className={styles.quoteMark}>"</span>
                <p>
                  Every frame is a decision.<br />
                  Every cut is a commitment to the story.
                </p>
              </blockquote>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
