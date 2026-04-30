import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectGrid.module.css';

export default function ProjectGrid({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const closeModal = () => setSelectedProject(null);

  const stripVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: i * 0.12,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  // Use Vimeo thumbnail
  const getThumbnail = (videoId) => `https://vumbnail.com/${videoId}.jpg`;

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

          {/* Horizontal Strips */}
          <div className={styles.strips}>
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                className={`${styles.strip} ${index % 2 !== 0 ? styles.stripReversed : ''}`}
                custom={index}
                variants={stripVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                aria-label={`View project: ${project.title}`}
              >
                {/* Thumbnail Side */}
                <div className={styles.stripThumbnail}>
                  <motion.div
                    className={styles.thumbnailInner}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={getThumbnail(project.videoId)}
                      alt={`${project.title} - ${project.category}`}
                      className={styles.thumbnail}
                      loading="lazy"
                    />
                    {/* Play overlay */}
                    <div className={styles.playOverlay}>
                      <svg viewBox="0 0 56 56" fill="none" className={styles.playIcon}>
                        <circle cx="28" cy="28" r="27" stroke="currentColor" strokeWidth="1" />
                        <polygon points="23,18 38,28 23,38" fill="currentColor" />
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Info Side */}
                <div className={styles.stripInfo}>
                  <div className={styles.stripMeta}>
                    <span className={styles.stripNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <span className={styles.stripDivider} />
                    <span className="label">{project.category}</span>
                  </div>

                  <h3 className={styles.stripTitle}>{project.title}</h3>
                  <p className={styles.stripSubtitle}>A Papadhimitri Production</p>

                  <p className={styles.stripDesc}>{project.description}</p>

                  <div className={styles.stripFooter}>
                    <span className={styles.stripRole}>{project.role}</span>
                    <span className={styles.stripYear}>{project.year}</span>
                  </div>

                  <div className={styles.stripCta}>
                    <span>Watch Project</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.ctaArrow}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
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
                <p className={styles.modalSubtitle}>A Papadhimitri Production</p>
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
