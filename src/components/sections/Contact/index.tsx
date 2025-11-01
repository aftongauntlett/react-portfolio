import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { m } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import MotionSection from '@/components/shared/MotionSection';
import { FormField, TextAreaField } from '@/components/shared/FormComponents';
import { useJobContact } from '@/context/JobContactContext';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  _gotcha: string; // Formspree's built-in honeypot field
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactSection() {
  const { jobData, clearJobData } = useJobContact();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    _gotcha: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Function to generate prefilled message for job inquiries
  const generateJobMessage = (jobTitle: string, company: string) => {
    return `Hello! I think you would be a great fit for the ${jobTitle} position at ${company}. I'd love to connect and see if there's an opportunity to chat.`;
  };

  // Handle job data prefilling
  useEffect(() => {
    if (jobData) {
      const prefillMessage = generateJobMessage(jobData.jobTitle, jobData.company);
      setFormData((prev) => ({
        ...prev,
        message: prefillMessage,
      }));
      // Clear the job data after prefilling
      clearJobData();
    }
  }, [jobData, clearJobData]);

  // Simple email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if form has minimum required fields (for button state)
  const isFormReady = (): boolean => {
    return (
      formData.email.trim().length > 0 &&
      isValidEmail(formData.email) &&
      formData.message.trim().length >= 10
    );
  };

  // Basic form validation (Formspree handles spam/security)
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name is optional - no validation needed

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (formData.email.length > 254) {
      newErrors.email = 'Email must be 254 characters or less';
    }

    // Phone is optional, but validate format if provided
    if (formData.phone.trim()) {
      const phoneRegex = /^[+]?[\s\-()]*([0-9][\s\-()]*){10,14}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      } else if (formData.phone.length > 20) {
        newErrors.phone = 'Phone number must be 20 characters or less';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Please provide a more detailed message (at least 10 characters)';
    } else if (formData.message.length > 2000) {
      newErrors.message = 'Message must be 2000 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing (but not for honeypot)
    if (name !== '_gotcha' && errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('https://formspree.io/f/mpwldyrq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _gotcha: formData._gotcha,
        }),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: "Message sent successfully! I'll get back to you soon.",
        });

        setFormData({ name: '', email: '', phone: '', message: '', _gotcha: '' });
      } else {
        // Log the actual error response for debugging
        const errorText = await response.text();
        console.error('Formspree error response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
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
    <m.div
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Formspree's built-in honeypot field */}
          <input
            type="text"
            name="_gotcha"
            value={formData._gotcha}
            onChange={handleInputChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <FormField
            label="Name"
            name="name"
            optional
            placeholder="Your name"
            maxLength={100}
            value={formData.name}
            onChange={handleInputChange}
            disabled={isLoading}
            error={errors.name}
            spellCheck={false}
          />

          {/* Email and Phone in 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              label="Email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              maxLength={254}
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              error={errors.email}
              spellCheck={false}
            />

            <FormField
              label="Phone"
              name="phone"
              type="tel"
              optional
              placeholder="+1 (555) 123-4567"
              maxLength={20}
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isLoading}
              error={errors.phone}
              spellCheck={false}
            />
          </div>

          <TextAreaField
            label="Message"
            name="message"
            required
            placeholder="How can I help?"
            maxLength={2000}
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            disabled={isLoading}
            error={errors.message}
          />
          {status.message && (
            <div
              className={`p-4 rounded-lg text-sm border-2 ${
                status.type === 'success'
                  ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/30'
                  : status.type === 'error'
                    ? 'bg-red-50 text-red-800 border-red-200'
                    : 'bg-blue-50 text-blue-800 border-blue-200'
              }`}
              role={status.type === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              <div className="flex items-start">
                <span
                  className={`inline-block w-2 h-2 rounded-full mt-1.5 mr-3 ${
                    status.type === 'success'
                      ? 'bg-[var(--color-primary)]'
                      : status.type === 'error'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                  }`}
                ></span>
                {status.message}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-3">
            <Button
              type="submit"
              disabled={isLoading || !isFormReady()}
              variant="outline"
              color="primary"
              className={isLoading ? 'btn--loading' : ''}
              title={!isFormReady() && !isLoading ? 'Please fill in all required fields' : ''}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </MotionSection>
    </m.div>
  );
}
