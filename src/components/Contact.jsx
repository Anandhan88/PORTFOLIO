import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useScrollRevealGSAP } from '../hooks/useScrollRevealGSAP';
import { supabase, isSupabaseReady } from '../supabaseClient';

const { FiMail, FiLinkedin, FiGithub, FiCode, FiSend, FiMapPin, FiCheck, FiAlertCircle } = FiIcons;

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
    <section id="contact" className="py-24 relative" data-scroll="section">
      <div className="container mx-auto px-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-20">
            <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4">
              <span className="scroll-word inline-block">Get</span> <span className="scroll-word inline-block">In</span> <span className="scroll-word inline-block text-gradient">Touch</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full opacity-80" />
            <p className="text-slate-200 mt-6 max-w-2xl mx-auto text-lg font-semibold">
              Let's collaborate and innovate together! Open to internships and real-world project opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto" style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}>
            {/* Contact Form */}
            <motion.div
              initial={{ x: -30, opacity: 0, rotateY: -10 }}
              whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                z: 20,
                rotateY: 2,
                boxShadow: '0 25px 50px rgba(6, 182, 212, 0.25), 0 0 60px rgba(56, 189, 248, 0.2)',
                transition: { duration: 0.3 }
              }}
              className="glass-panel rounded-3xl p-8 md:p-10 border border-slate-700/50"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '0 15px 40px rgba(6, 182, 212, 0.15), inset 0 1px 1px rgba(6, 182, 212, 0.2)'
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-8">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label className="block text-slate-300 text-sm font-medium mb-2 ml-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="group">
                  <label className="block text-slate-300 text-sm font-medium mb-2 ml-1">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="group">
                  <label className="block text-slate-300 text-sm font-medium mb-2 ml-1">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                  >
                    <SafeIcon icon={FiAlertCircle} className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.98 }}
                  data-anim="primary-btn"
                  className={`btn-3d w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white transition-all duration-300 ${isSuccess ? 'bg-green-600' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25'}`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSuccess ? (
                    <>
                      <SafeIcon icon={FiCheck} className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiSend} className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ x: 30, opacity: 0, rotateY: 10 }}
              whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div 
                whileHover={{
                  y: -8,
                  z: 20,
                  boxShadow: '0 20px 45px rgba(6, 182, 212, 0.25), 0 0 50px rgba(56, 189, 248, 0.2)',
                  transition: { duration: 0.3 }
                }}
                className="glass-panel rounded-3xl p-8 border-l-4 border-l-cyan-500"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 12px 35px rgba(6, 182, 212, 0.15)'
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
                <p className="text-slate-200 leading-relaxed mb-8 font-semibold">
                  I'm always excited to discuss new opportunities, collaborate on innovative projects, 
                  or simply chat about the latest in AI and technology.
                </p>

                <div className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        x: 8,
                        z: 15,
                        scale: 1.02,
                        boxShadow: '0 10px 30px rgba(6, 182, 212, 0.25)',
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-4 p-4 rounded-xl bg-slate-900/30 border border-transparent ${contact.border} transition-all duration-300 group`}
                      style={{
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <motion.div 
                        whileHover={{ scale: 1.25, rotate: [0, -8, 8, -8, 0], transition: { duration: 0.5 } }}
                        className={`p-3 rounded-xl bg-slate-800 group-hover:bg-blue-600/40 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300`}
                      >
                        <SafeIcon icon={contact.icon} className={`w-5 h-5 ${contact.color}`} />
                      </motion.div>
                      <div>
                        <p className="text-slate-300 font-medium">{contact.label}</p>
                        <p className="text-slate-300 text-sm group-hover:text-cyan-400 transition-colors">{contact.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                whileHover={{
                  y: -5,
                  z: 15,
                  boxShadow: '0 15px 40px rgba(6, 182, 212, 0.2)',
                  transition: { duration: 0.3 }
                }}
                className="glass-panel rounded-3xl p-8 bg-gradient-to-br from-white/5 to-transparent"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 8px 25px rgba(6, 182, 212, 0.1)'
                }}
              >
                <h4 className="text-lg font-semibold text-white mb-6">What I'm Looking For</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Internship opportunities in AI/ML', 'Full-stack development projects', 'Open source collaborations', 'Tech mentorship & learning'].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_currentColor]" />
                      <span className="text-slate-300 text-sm leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;