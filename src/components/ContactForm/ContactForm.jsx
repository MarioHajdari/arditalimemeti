import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Using Web3Forms (free, no backend)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY', // Replace with actual key
          subject: `New Project Inquiry from ${formData.name}`,
          ...formData,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: '', budget: '', timeline: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label="Project inquiry form">
      <div className={styles.formGrid}>
        {/* Name */}
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-name" className={styles.label}>Your Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Full name"
            autoComplete="name"
          />
          <div className={styles.fieldLine} />
        </div>

        {/* Email */}
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-email" className={styles.label}>Email Address</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="your@email.com"
            autoComplete="email"
          />
          <div className={styles.fieldLine} />
        </div>

        {/* Project Type */}
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-type" className={styles.label}>Project Type</label>
          <select
            id="contact-type"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="" disabled>Select a category</option>
            <option value="commercial">Commercial / Brand Film</option>
            <option value="music-video">Music Video</option>
            <option value="documentary">Documentary</option>
            <option value="short-film">Short Film / Narrative</option>
            <option value="corporate">Corporate Video</option>
            <option value="event">Event Coverage</option>
            <option value="editing">Post-Production / Editing Only</option>
            <option value="other">Other</option>
          </select>
          <div className={styles.fieldLine} />
        </div>

        {/* Budget Range */}
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-budget" className={styles.label}>Budget Range</label>
          <select
            id="contact-budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="" disabled>Approximate budget</option>
            <option value="under-1k">Under €1,000</option>
            <option value="1k-5k">€1,000 - €5,000</option>
            <option value="5k-15k">€5,000 - €15,000</option>
            <option value="15k+">€15,000+</option>
            <option value="discuss">Let's Discuss</option>
          </select>
          <div className={styles.fieldLine} />
        </div>

        {/* Timeline */}
        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
          <label htmlFor="contact-timeline" className={styles.label}>Project Timeline</label>
          <select
            id="contact-timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="" disabled>When do you need it?</option>
            <option value="asap">As Soon As Possible</option>
            <option value="1-month">Within 1 Month</option>
            <option value="2-3-months">2-3 Months</option>
            <option value="flexible">Flexible / No Rush</option>
          </select>
          <div className={styles.fieldLine} />
        </div>

        {/* Message */}
        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
          <label htmlFor="contact-message" className={styles.label}>Tell Me About Your Vision</label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
            placeholder="Describe your project, the story you want to tell, and any references or inspiration you have in mind..."
            rows={5}
          />
          <div className={styles.fieldLine} />
        </div>
      </div>

      {/* Submit */}
      <div className={styles.submitWrap}>
        <motion.button
          type="submit"
          className={styles.submitBtn}
          disabled={status === 'sending'}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent ✓' : 'Send Inquiry'}
        </motion.button>

        {status === 'error' && (
          <p className={styles.errorMsg}>Something went wrong. Please try again or reach out directly.</p>
        )}
      </div>
    </form>
  );
}
