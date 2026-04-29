import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, index, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Use Vimeo thumbnail
  const thumbnailUrl = `https://vumbnail.com/${project.videoId}.jpg`;

  return (
    <motion.article
      ref={cardRef}
      className={`${styles.card} ${index % 3 === 1 ? styles.cardOffset : ''}`}
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect && onSelect(project)}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.title}`}
    >
      {/* Thumbnail */}
      <div className={styles.thumbnailWrap}>
        <motion.div
          className={styles.thumbnailInner}
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={thumbnailUrl}
            alt={`${project.title} - ${project.category}`}
            className={styles.thumbnail}
            loading="lazy"
          />
        </motion.div>

        {/* Hover Overlay */}
        <motion.div
          className={styles.hoverOverlay}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.playIcon}>
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" />
              <polygon points="20,16 34,24 20,32" fill="currentColor" />
            </svg>
          </div>
        </motion.div>

        {/* Category Badge */}
        <div className={styles.categoryBadge}>
          <span>{project.category}</span>
        </div>
      </div>

      {/* Info */}
      <motion.div
        className={styles.cardInfo}
        animate={{
          y: isHovered ? 0 : 5,
          opacity: isHovered ? 1 : 0.7,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.cardMeta}>
          <span className={styles.cardYear}>{project.year}</span>
          <span className={styles.cardDivider}>—</span>
          <span className={styles.cardRole}>{project.role}</span>
        </div>
        <h3 className={styles.cardTitle}>{project.title}</h3>
      </motion.div>
    </motion.article>
  );
}
