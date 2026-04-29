import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './ProjectGrid.module.css';

export default function ProjectGrid({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const closeModal = () => setSelectedProject(null);

  return (
    <>
      <section id="selected-work" className={styles.section} aria-label="Selected work">
        <div className={`container ${styles.container}`}>
          {/* Section Header */}
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label">Selected Work</span>
            <h2 className={styles.heading}>
              Projects that<br />
              <em>define the craft</em>
            </h2>
          </motion.div>

          {/* Asymmetric Grid */}
          <motion.div
            className={styles.grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`${styles.gridItem} ${styles[`item${index + 1}`]}`}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onSelect={setSelectedProject}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeModal}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className={styles.closeBtn} onClick={closeModal} aria-label="Close video">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Video Player */}
              <div className={styles.videoWrapper}>
                <iframe
                  src={`https://player.vimeo.com/video/${selectedProject.videoId}?autoplay=1&title=0&byline=0&portrait=0`}
                  className={styles.videoPlayer}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={selectedProject.title}
                />
              </div>

              {/* Project Info */}
              <div className={styles.modalInfo}>
                <div className={styles.modalMeta}>
                  <span className="label">{selectedProject.category}</span>
                  <span className={styles.modalYear}>{selectedProject.year}</span>
                </div>
                <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                <p className={styles.modalDesc}>{selectedProject.description}</p>
                <p className={styles.modalRole}>
                  <strong>Role:</strong> {selectedProject.role}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
