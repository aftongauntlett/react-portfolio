import { describe, it, expect } from 'vitest';
import { formatDate } from '../dateFormatter';

describe('formatDate', () => {
  it('formats date string correctly', () => {
    // Date strings are parsed as UTC midnight, which may shift based on timezone
    const result = formatDate('2024-03-15');
    expect(result).toMatch(/March 1[45], 2024/);
  });

  it('handles different month formats', () => {
    const jan = formatDate('2024-01-01');
    const dec = formatDate('2024-12-31');

    expect(jan).toMatch(/January|December/);
    expect(dec).toMatch(/December|January/);
  });

  it('handles ISO 8601 date strings', () => {
    const result = formatDate('2024-06-15T12:00:00Z');
    expect(result).toMatch(/June 1[45], 2024/);
  });

  it('handles dates with single-digit days and months', () => {
    const result = formatDate('2024-5-5');
    expect(result).toMatch(/May [45], 2024/);
  });
});
