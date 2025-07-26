import { useState, type ChangeEvent, type FormEvent } from 'react';
import Button from '@/components/shared/Button';

const textInputClass = `
  mt-1 block w-full rounded-md
  border border-[var(--color-line)]
  bg-transparent px-3 py-2
  text-[var(--color-text)]
  placeholder-[var(--color-muted)]
  focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
  disabled:opacity-50 disabled:cursor-not-allowed
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: result.message || 'Message sent successfully!',
        });

        // Clear form on success
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    }
  };

  const isLoading = status.type === 'loading';

  return (
    <section id="contact" className="space-y-6">
      <p className="text-[var(--color-muted)]">
        Whether you want to chat about a job opening, a project, collaboration, or just say hi - my
        inbox is always open. I'll try to respond as soon as I can!
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name */}
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

        {/* Email */}
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

        {/* Message */}
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

        {/* Status Message */}
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

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className={isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </section>
  );
}
