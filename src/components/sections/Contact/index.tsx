import { motion } from 'framer-motion';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { COMPONENT_SPACING } from '@/constants/spacing';
import ContactForm from './ContactForm';
import { useContactForm } from './useContactForm';

export default function ContactSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const {
    formRef,
    formStatus,
    statusMessage,
    turnstileCircuitOpen,
    emailValidationMessage,
    isSubmitting,
    isSubmitDisabled,
    requiresTurnstileToken,
    validateEmailField,
    handleSubmit,
  } = useContactForm();

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: getMotionDuration(0.5, prefersReducedMotion), ease: 'easeOut' }}
    >
      <div className={COMPONENT_SPACING.STACK_STANDARD}>
        <p className="text-description max-w-lg">
          Have a role, a project, or a question in mind? Send me a message below and I will get back
          to you shortly.
        </p>

        <ContactForm
          formRef={formRef}
          formStatus={formStatus}
          statusMessage={statusMessage}
          turnstileCircuitOpen={turnstileCircuitOpen}
          emailValidationMessage={emailValidationMessage}
          isSubmitting={isSubmitting}
          isSubmitDisabled={isSubmitDisabled}
          requiresTurnstileToken={requiresTurnstileToken}
          validateEmailField={validateEmailField}
          handleSubmit={handleSubmit}
        />
      </div>
    </motion.div>
  );
}
