import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import PageTransition from '../../components/PageTransition/PageTransition';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import ContactForm from '../../components/ContactForm/ContactForm';
import Footer from '../../components/Footer/Footer';
import styles from './Contact.module.css';

export default function Contact() {
  const phoneNumber = '+355695863218';
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;
  const phoneLink = `tel:${phoneNumber}`;

  return (
    <PageTransition>
      <main className={styles.contact}>
        {/* ── Hero Section ──────────────────────────── */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroContainer}`}>
            <motion.div
              className={styles.heroText}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label">Get In Touch</span>
              <h1 className={styles.heroHeading}>
                Let's create<br />
                <em>something</em>
              </h1>
              <p className={styles.heroDesc}>
                Have a project in mind? Whether it's a commercial, music video, documentary,
                or something entirely new — I'd love to hear about it.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Contact Content ───────────────────────── */}
        <section className={styles.content}>
          <div className={`container ${styles.contentGrid}`}>
            {/* Left: Form */}
            <ScrollReveal direction="left" className={styles.formSection}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Tell me about your project</h2>
                <p className={styles.formSubtitle}>
                  Fill out the details below and I'll get back to you within 48 hours.
                </p>
              </div>
              <ContactForm />
            </ScrollReveal>

            {/* Right: Direct Contact */}
            <ScrollReveal direction="right" delay={0.2} className={styles.directSection}>
              <div className={styles.directContent}>
                {/* Quick Contact */}
                <div className={styles.directBlock}>
                  <h3 className={styles.directLabel}>Prefer a direct conversation?</h3>
                  <div className={styles.contactButtons}>
                    <a
                      href={phoneLink}
                      className={styles.contactBtn}
                      aria-label="Call Ardit"
                    >
                      <Phone size={20} strokeWidth={1.5} />
                      <span>Call Me</span>
                    </a>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.contactBtn} ${styles.whatsappBtn}`}
                      aria-label="Message on WhatsApp"
                    >
                      <MessageCircle size={20} strokeWidth={1.5} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className={styles.directBlock}>
                  <span className="label">Based In</span>
                  <p className={styles.directText}>Albania</p>
                  <p className={styles.directSubtext}>Available worldwide for remote collaboration</p>
                </div>

                {/* Decorative */}
                <div className={styles.decorBlock}>
                  <div className={styles.decorLine} />
                  <p className={styles.decorQuote}>
                    "Every project begins<br />with a conversation."
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
