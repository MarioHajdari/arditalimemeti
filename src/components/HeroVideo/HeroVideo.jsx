import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './HeroVideo.module.css';

export default function HeroVideo({ videoId, taglines }) {
  const [currentTagline, setCurrentTagline] = useState(0);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!taglines || taglines.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTagline(prev => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [taglines]);

  const scrollToWork = () => {
    const workSection = document.getElementById('selected-work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} aria-label="Hero showreel">
      {/* Video Background */}
      <div className={styles.videoContainer}>
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&quality=1080p`}
          className={styles.videoIframe}
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Showreel background video"
          loading="eager"
        />
        <div className={styles.videoOverlay} />
        <div className={styles.videoGradientBottom} />
      </div>

      {/* Content Overlay */}
      <div className={styles.heroContent}>
        <motion.div
          className={styles.heroInner}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {/* Label */}
          <motion.span
            className={`label ${styles.heroLabel}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Multimedia Producer · Video Editor
          </motion.span>

          {/* Name */}
          <motion.h1
            className={styles.heroName}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.firstName}>Ardit</span>
            <span className={styles.lastName}>Alimemeti</span>
          </motion.h1>

          {/* Rotating Tagline */}
          <div className={styles.taglineContainer}>
            <motion.p
              key={currentTagline}
              className={styles.tagline}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
            >
              {taglines[currentTagline]}
            </motion.p>
          </div>

          {/* CTA */}
          <motion.button
            className={styles.heroCta}
            onClick={scrollToWork}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Work</span>
            <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div className={styles.scrollLine}>
            <div className={styles.scrollDot} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
