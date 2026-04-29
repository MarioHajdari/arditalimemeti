import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.container}`}>
        {/* CTA Section */}
        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label">Next Step</span>
          <h2 className={styles.ctaHeading}>
            Have a story<br />
            <em>worth telling?</em>
          </h2>
          <Link to="/contact" className={styles.ctaButton}>
            <span>Let's Talk</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.ctaArrow}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom Row */}
        <div className={styles.bottomRow}>
          <div className={styles.copyright}>
            <span className={styles.wordmark}>
              <span className={styles.wordmarkFirst}>ARDIT</span>{' '}
              <span className={styles.wordmarkLast}>ALIMEMETI</span>
            </span>
            <p className={styles.copyrightText}>© {currentYear} All rights reserved.</p>
          </div>

          <nav className={styles.footerNav} aria-label="Footer navigation">
            <Link to="/" className={styles.footerLink}>Home</Link>
            <Link to="/about" className={styles.footerLink}>About</Link>
            <Link to="/contact" className={styles.footerLink}>Contact</Link>
          </nav>

          <div className={styles.footerTagline}>
            <p>Based in Albania · Available Worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
