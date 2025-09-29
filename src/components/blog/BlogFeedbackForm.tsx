import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/shared/Button';
import { FormField, TextAreaField } from '@/components/shared/FormComponents';

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
  title?: string;
  description?: string;
}

export function BlogFeedbackForm({
  title = 'Share Your Feedback',
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
    <div className="max-w-2xl mx-auto bg-[var(--color-surface)] rounded-lg border border-[var(--color-line)] p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">{title}</h3>
        <p className="text-[var(--color-muted)] mb-4">{description}</p>
        <div className="text-sm text-[var(--color-muted)] space-y-2">
          <p>
            <strong>Why feedback matters:</strong> Playtesting is crucial for game development.
            Every perspective helps identify issues I might miss as the developer.
          </p>
          <p>
            <strong>What to share:</strong> Gameplay thoughts, bugs, confusing mechanics, or
            anything that stood out—both positive and negative feedback welcome!
          </p>
          <p>
            <strong>Privacy:</strong> Name and email are optional. Include them only if you'd like
            me to respond. Anonymous feedback is perfectly fine too.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <FormField
          label="Name"
          name="name"
          type="text"
          optional
          placeholder="Your name (optional)"
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
          placeholder="your@email.com (optional - only if you want a response)"
          value={formData.email}
          onChange={handleInputChange}
          disabled={status.type === 'loading'}
          maxLength={200}
        />

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

        <div className="flex items-center justify-between">
          <Button
            type="submit"
            variant="solid"
            color="primary"
            disabled={status.type === 'loading' || !formData.feedback.trim()}
          >
            {status.type === 'loading' ? 'Sending...' : 'Send Feedback'}
          </Button>

          {status.message && (
            <div
              className={`text-sm ${
                status.type === 'success'
                  ? 'text-[var(--color-status-production)]'
                  : status.type === 'error'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-[var(--color-muted)]'
              }`}
            >
              {status.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
