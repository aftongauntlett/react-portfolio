import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import MotionSection from '@/components/shared/MotionSection';

const textInputClass = `
  mt-1 block w-full rounded-md
  border border-[var(--color-line)]
  px-3 py-2
  text-[var(--color-text)]
  placeholder-[var(--color-muted)]
  focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
  disabled:opacity-50 disabled:cursor-not-allowed
  bg-[var(--color-surface)]
`;

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('https://formspree.io/f/mpwldyrq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: "Message sent successfully! I'll get back to you soon.",
        });

        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email me directly.',
      });
    }
  };

  const isLoading = status.type === 'loading';

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <MotionSection
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: 'easeOut' as const,
            },
          },
        }}
      >
        <div className="space-y-4">
          <p className="text-[var(--color-muted)]">
            Whether you want to chat about a job opening, a project, collaboration, or just say hi -
            my inbox is always open. I'll try to respond as soon as I can!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-3">
            <div className="text-left">
              <Button
                variant="link"
                color="primary"
                href="mailto:hello@aftongauntlett.com"
                className="text-sm pb-0.5"
              >
                hello@aftongauntlett.com
              </Button>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: 'easeOut' as const,
            },
          },
        }}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)]">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="Your name"
              className={textInputClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="you@example.com"
              className={textInputClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text)]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="How can I help?"
              className={textInputClass}
            />
          </div>

          {status.message && (
            <div
              className={`p-3 rounded-md text-sm ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : status.type === 'error'
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}
              role={status.type === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {status.message}
            </div>
          )}

          <div className="flex justify-end pt-3">
            <Button
              type="submit"
              disabled={isLoading}
              variant="outline"
              color="primary"
              style={isLoading ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </MotionSection>
    </motion.div>
  );
}
