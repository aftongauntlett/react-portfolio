import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/shared/Button';
import { FormField, TextAreaField } from '@/components/shared/FormComponents';

interface FeedbackFormData {
  name: string;
  email: string;
  liked: string;
  disliked: string;
  wouldChange: string;
  _gotcha: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

interface BlogFeedbackFormProps {
  description?: string;
}

export function BlogFeedbackForm({
  description = "Tried the game? I'd love to hear your thoughts and suggestions!",
}: BlogFeedbackFormProps) {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    liked: '',
    disliked: '',
    wouldChange: '',
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
    if (!formData.liked.trim() && !formData.disliked.trim() && !formData.wouldChange.trim()) {
      setStatus({
        type: 'error',
        message: 'Please answer at least one question before submitting.',
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
          liked: formData.liked,
          disliked: formData.disliked,
          wouldChange: formData.wouldChange,
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
          liked: '',
          disliked: '',
          wouldChange: '',
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
    <div className="space-y-8">
      <p className="text-base text-[var(--color-text)]/80 leading-relaxed">{description}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="_gotcha"
          value={formData._gotcha}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="space-y-5">
          <TextAreaField
            label="What's one thing you loved?"
            name="liked"
            placeholder="e.g., The art style was charming, the puzzle mechanics felt satisfying..."
            value={formData.liked}
            onChange={handleInputChange}
            disabled={status.type === 'loading'}
            rows={3}
            maxLength={500}
          />

          <TextAreaField
            label="What's one thing that frustrated you?"
            name="disliked"
            placeholder="e.g., The controls felt clunky, I got stuck on level 3..."
            value={formData.disliked}
            onChange={handleInputChange}
            disabled={status.type === 'loading'}
            rows={3}
            maxLength={500}
          />

          <TextAreaField
            label="If you could change one thing, what would it be?"
            name="wouldChange"
            placeholder="e.g., Add a tutorial, make the timer more forgiving, improve the UI..."
            value={formData.wouldChange}
            onChange={handleInputChange}
            disabled={status.type === 'loading'}
            rows={3}
            maxLength={500}
          />
        </div>

        <div className="pt-4 border-t border-[var(--color-text)]/10">
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Want a response? Leave your contact info (optional):
          </p>
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
        </div>

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
            disabled={
              status.type === 'loading' ||
              (!formData.liked.trim() && !formData.disliked.trim() && !formData.wouldChange.trim())
            }
            title={
              !formData.liked.trim() &&
              !formData.disliked.trim() &&
              !formData.wouldChange.trim() &&
              status.type !== 'loading'
                ? 'Please answer at least one question before submitting'
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
