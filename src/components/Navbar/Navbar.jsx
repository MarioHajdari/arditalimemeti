import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { path: '/', label: 'Home', number: '01' },
    { path: '/about', label: 'About', number: '02' },
    { path: '/contact', label: 'Contact', number: '03' },
  ];

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1], delay: 0.2 }
    }
  };

  const linkContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    },
    exit: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const linkVariants = {
    hidden: { y: 80, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      y: -40,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.65, 0, 0.35, 1] }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isOpen ? styles.menuOpen : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.navInner}>
          {/* Wordmark Logo */}
          <Link to="/" className={styles.wordmark} aria-label="Ardit Alimemeti - Home">
            <span className={styles.wordmarkName}>ARDIT</span>
            <span className={styles.wordmarkSurname}>ALIMEMETI</span>
          </Link>

          {/* Aperture Menu Button */}
          <button
            className={`${styles.apertureBtn} ${isOpen ? styles.apertureOpen : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="main-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <svg viewBox="0 0 60 60" className={styles.apertureSvg}>
              {/* Outer lens ring */}
              <circle cx="30" cy="30" r="27" className={styles.lensRing} />
              <circle cx="30" cy="30" r="25" className={styles.lensRingInner} />

              {/* 6 aperture blades - classic iris pattern */}
              <g className={styles.bladesGroup}>
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = i * 60;
                  const rad = (angle * Math.PI) / 180;
                  const outerR = 22;
                  const x1 = 30 + outerR * Math.cos(rad);
                  const y1 = 30 + outerR * Math.sin(rad);
                  const nextAngle = ((i + 2) % 6) * 60;
                  const nextRad = (nextAngle * Math.PI) / 180;
                  const innerR = 9;
                  const x2 = 30 + innerR * Math.cos(nextRad);
                  const y2 = 30 + innerR * Math.sin(nextRad);
                  const midAngle = ((i + 1) % 6) * 60;
                  const midRad = (midAngle * Math.PI) / 180;
                  const midR = 18;
                  const mx = 30 + midR * Math.cos(midRad);
                  const my = 30 + midR * Math.sin(midRad);
                  return (
                    <path
                      key={i}
                      d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                      className={styles.apertureBlade}
                      style={{ animationDelay: `${i * 0.05}s` }}
                    />
                  );
                })}
              </g>

              {/* Center aperture hole */}
              <circle cx="30" cy="30" r="7" className={styles.apertureHole} />

              {/* Focus ring marks */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x1 = 30 + 25 * Math.cos(rad);
                const y1 = 30 + 25 * Math.sin(rad);
                const x2 = 30 + 27 * Math.cos(rad);
                const y2 = 30 + 27 * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    className={styles.focusMark}
                  />
                );
              })}
            </svg>
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="main-menu"
            className={styles.menuOverlay}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.menuContent}>
              <motion.ul
                className={styles.menuLinks}
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.path}
                    variants={linkVariants}
                    className={styles.menuItem}
                  >
                    <Link
                      to={link.path}
                      className={`${styles.menuLink} ${location.pathname === link.path ? styles.activeLink : ''}`}
                    >
                      <span className={styles.linkNumber}>{link.number}</span>
                      <span className={styles.linkText}>{link.label}</span>
                      <span className={styles.linkLine}></span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className={styles.menuFooter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.6 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <p className={styles.menuTagline}>Where Bold Vision Meets Cinematic Craft.</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
