import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiCode, FiSend, FiMapPin, FiCheck, FiAlertCircle } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useScrollRevealGSAP } from '../hooks/useScrollRevealGSAP';
import { supabase, isSupabaseReady } from '../supabaseClient';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!isSupabaseReady) {
      setError('Contact form is not configured yet. Please reach out via email directly.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: supabaseError } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        ]);

      if (supabaseError) throw supabaseError;

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Something went wrong. Please try again or reach out via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: 'anand.settu2006@gmail.com', href: 'mailto:anand.settu2006@gmail.com', color: 'text-blue-400', border: 'hover:border-blue-500/50' },
    { icon: FiLinkedin, label: 'LinkedIn', value: '/in/anandhan18', href: 'https://www.linkedin.com/in/anandhan18', color: 'text-blue-600', border: 'hover:border-blue-600/50' },
    { icon: FiGithub, label: 'GitHub', value: '/Anandhan88', href: 'https://github.com/Anandhan88', color: 'text-white', border: 'hover:border-white/50' },
    { icon: FiCode, label: 'LeetCode', value: '/Anandhan88', href: 'https://leetcode.com/u/Anandhan88/', color: 'text-orange-500', border: 'hover:border-orange-500/50' }
  ];

  const headingRef = useScrollRevealGSAP({ enableBlur: true, baseOpacity: 0.15, baseRotation: 2 });

  return (
    <section id="contact" className="py-28 relative bg-black dark:bg-black theme-light:bg-neutral-50 text-white theme-light:text-black border-t border-neutral-900 theme-light:border-neutral-200" data-scroll="section">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-1 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest bg-cyan-950/20">
              07 // INITIATE CONTACT & COLLABORATION
            </div>
            <h2 ref={headingRef} className="text-5xl sm:text-6xl md:text-7xl font-serif font-extrabold mb-6 uppercase tracking-tight">
              LET'S BUILD <span className="italic font-normal text-cyan-400">TOGETHER</span>
            </h2>
            <p className="text-neutral-400 theme-light:text-neutral-600 max-w-3xl mx-auto text-xl md:text-2xl font-serif leading-relaxed">
              Open to engineering opportunities, algorithmic research, and production project inquiries.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="border border-neutral-800 theme-light:border-neutral-300 bg-neutral-900/60 theme-light:bg-neutral-100/60 p-8 md:p-10"
            >
              <h3 className="text-3xl font-serif font-bold text-white theme-light:text-black mb-8 border-b border-neutral-800 theme-light:border-neutral-200 pb-4">Send a Direct Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">01 / YOUR NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-black theme-light:bg-white border border-neutral-800 theme-light:border-neutral-300 text-white theme-light:text-black font-serif text-lg focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="e.g. Alexander Hamilton"
                  />
                </div>

                <div>
                  <label className="block text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">02 / YOUR EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-black theme-light:bg-white border border-neutral-800 theme-light:border-neutral-300 text-white theme-light:text-black font-serif text-lg focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="e.g. alexander@domain.com"
                  />
                </div>

                <div>
                  <label className="block text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">03 / MESSAGE CONTENT</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-5 py-4 bg-black theme-light:bg-white border border-neutral-800 theme-light:border-neutral-300 text-white theme-light:text-black font-serif text-lg focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    placeholder="Outline your project scope or opportunity..."
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 px-4 py-3 border border-red-500/40 bg-red-500/10 text-red-400 text-sm font-serif"
                  >
                    <SafeIcon icon={FiAlertCircle} className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full flex items-center justify-center gap-3 py-4 font-serif font-bold text-lg tracking-wider transition-colors ${
                    isSuccess 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-cyan-400 text-black hover:bg-cyan-300'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-black/30 border-t-black animate-spin" />
                  ) : isSuccess ? (
                    <>
                      <SafeIcon icon={FiCheck} className="w-5 h-5" />
                      MESSAGE SENT SUCCESSFULLY
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiSend} className="w-5 h-5" />
                      TRANSMIT MESSAGE
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="border border-neutral-800 theme-light:border-neutral-300 bg-neutral-900/60 theme-light:bg-neutral-100/60 p-8 md:p-10 border-l-2 border-l-cyan-400">
                <h3 className="text-3xl font-serif font-bold text-white theme-light:text-black mb-4">Direct Channels</h3>
                <p className="text-neutral-300 theme-light:text-neutral-700 leading-relaxed mb-8 font-serif text-lg">
                  Reach out directly via email or professional network profiles for immediate discourse.
                </p>

                <div className="space-y-4">
                  {contactInfo.map((contact) => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 border border-neutral-800 theme-light:border-neutral-300 bg-black/40 theme-light:bg-white/60 hover:border-cyan-400 transition-colors group"
                    >
                      <div className="p-3 border border-neutral-800 text-cyan-400">
                        <SafeIcon icon={contact.icon} className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-neutral-400 theme-light:text-neutral-600 font-mono text-xs uppercase tracking-widest">{contact.label}</p>
                        <p className="text-neutral-200 theme-light:text-neutral-800 font-serif font-bold text-lg group-hover:text-cyan-400 transition-colors">{contact.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="border border-neutral-800 theme-light:border-neutral-300 bg-neutral-900/40 p-8">
                <h4 className="text-xl font-serif font-bold text-white theme-light:text-black mb-6 uppercase tracking-wide">COLLABORATION INTERESTS</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-serif">
                  {['AI / ML Engineering Internships', 'Full-Stack Web Applications', 'Algorithmic Data Science Research', 'Open-Source Infrastructure'].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-cyan-400" />
                      <span className="text-neutral-300 theme-light:text-neutral-700 text-base leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;