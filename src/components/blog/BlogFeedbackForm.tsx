import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/shared/Button';
import { FormField, TextAreaField } from '@/components/shared/FormComponents';
import { BLOG_PARAGRAPH_CLASSES } from '@/constants/styles';

interface FeedbackFormData {
  name: string;
  email: string;
  feedback: string;
  _gotcha: string; // Formspree's built-in honeypot field
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

interface BlogFeedbackFormProps {
  description?: string;
}

export function BlogFeedbackForm({
  description = "Played the game? I'd love to hear your thoughts!",
}: BlogFeedbackFormProps) {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    feedback: '',
    _gotcha: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.feedback.trim()) {
      setStatus({
        type: 'error',
        message: 'Please share your feedback before submitting.',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus({ type: 'loading', message: 'Sending feedback...' });

    try {
      const response = await fetch('https://formspree.io/f/mdkwanwy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name || 'Anonymous Player',
          email: formData.email || 'No email provided',
          feedback: formData.feedback,
          _gotcha: formData._gotcha,
        }),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thanks for your feedback! It really helps improve the game.',
        });
        setFormData({
          name: '',
          email: '',
          feedback: '',
          _gotcha: '',
        });
      } else {
        throw new Error('Failed to send feedback');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send feedback. Please try again or contact me directly.',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-8 mb-12">
        <div>
          <p className={BLOG_PARAGRAPH_CLASSES}>{description}</p>
        </div>

        <div className="space-y-4">
          <p className={BLOG_PARAGRAPH_CLASSES}>
            <strong className="text-[var(--color-secondary)]">Why feedback matters:</strong>{' '}
            Playtesting is crucial for game development. Every perspective helps identify issues I
            might miss as the developer.
          </p>
          <p className={BLOG_PARAGRAPH_CLASSES}>
            <strong className="text-[var(--color-secondary)]">What to share:</strong> Gameplay
            thoughts, bugs, confusing mechanics, or anything that stood out—both positive and
            negative feedback welcome!
          </p>
          <p className={BLOG_PARAGRAPH_CLASSES}>
            <strong className="text-[var(--color-secondary)]">Privacy:</strong> Name and email are
            optional. Include them only if you'd like me to respond. Anonymous feedback is perfectly
            fine too.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field for spam protection */}
        <input
          type="text"
          name="_gotcha"
          value={formData._gotcha}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Name and Email in 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Name"
            name="name"
            type="text"
            optional
            placeholder="Your name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={status.type === 'loading'}
            maxLength={100}
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            optional
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleInputChange}
            disabled={status.type === 'loading'}
            maxLength={200}
          />
        </div>

        <TextAreaField
          label="Your Feedback"
          name="feedback"
          required
          placeholder="Share your thoughts on the game mechanics, any bugs you found, or general impressions..."
          value={formData.feedback}
          onChange={handleInputChange}
          disabled={status.type === 'loading'}
          rows={6}
          maxLength={2000}
        />

        {status.message && (
          <div
            className={`p-4 rounded-lg text-sm border-2 ${
              status.type === 'success'
                ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/30'
                : status.type === 'error'
                  ? 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                  : 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
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
            variant="solid"
            color="primary"
            disabled={status.type === 'loading' || !formData.feedback.trim()}
            title={
              !formData.feedback.trim() && status.type !== 'loading'
                ? 'Please share your feedback before submitting'
                : ''
            }
          >
            {status.type === 'loading' ? 'Sending...' : 'Send Feedback'}
          </Button>
        </div>
      </form>
    </div>
  );
}
