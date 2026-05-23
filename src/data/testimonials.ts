export interface Testimonial {
  name: string;
  title: string;
  year: string;
  quote: string;
  truncated?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Skye Owen Odharo',
    title: 'Software Engineer · Booz Allen Hamilton',
    year: '2026',
    quote:
      'Afton is an exceptional colleague. Her innovative contributions and willingness to assist are highly valued. It is a pleasure to collaborate with her.',
  },
  {
    name: 'Zophie Quan',
    title: 'Senior Lead Engineer · Booz Allen Hamilton',
    year: '2026',
    quote:
      'Working with Afton at Booz was a privilege. She was an integral member of the team and brought forth fresh ideas and insight to our web applications.',
    truncated: true,
  },
  {
    name: 'Thomas Bridgwood',
    title: 'Lead Engineer · Booz Allen Hamilton',
    year: '2022',
    quote:
      'Afton was wonderful to work with; I was sad to see her go, but knew she would make a tremendous impact wherever she landed next. Afton was a tenacious and diligent contributor to our team, always seeking out new work and offering to help others.',
    truncated: true,
  },
  {
    name: 'Dan Rosenbaum',
    title: 'Teaching Assistant · GWU',
    year: '2021',
    quote:
      "I was Afton's Teaching Assistant when she attended George Washington University's in-depth, 12 week full stack web development bootcamp. Afton worked incredibly hard during her time with us and maintained the highest possible grade average, producing high-quality, polished, robust projects.",
    truncated: true,
  },
  {
    name: 'Gemini Sanford',
    title: 'Student Success Manager · GWU',
    year: '2020',
    quote:
      'The tech community is incredibly lucky for having added Afton to their ranks. I had the distinct pleasure of getting to know Afton while managing the coding program she was enrolled in at GW.',
    truncated: true,
  },
  {
    name: 'Rachel Michel Murray',
    title: 'Bootcamp Cohort · GWU',
    year: '2020',
    quote:
      'If you are looking to have stunning front-end design for a web application, Afton is a great asset to any team or development project!',
  },
  {
    name: 'Rachael Land',
    title: 'Senior Research Analyst · Access Confidential',
    year: '2018',
    quote:
      'Afton is an incredibly intelligent and efficient worker. Her research is always of the highest quality and thorough. She manages her time wisely and excels at meeting deadlines within a timely fashion.',
    truncated: true,
  },
  {
    name: 'Caroline Allgood Kigans',
    title: 'Research Manager · Access Confidential',
    year: '2018',
    quote:
      'Afton was recommended to hire by another colleague at Access Confidential -- someone who had never stuck their neck out for anyone, and so this was a true wake-up call that this person could really be something for our organization. And she surely was.',
    truncated: true,
  },
  {
    name: 'Rahul P',
    title: 'Technical Recruiter',
    year: '2018',
    quote:
      'Afton is a hard-working, dedicated and motivated employee. Being reliable and dependable she is very much committed towards her work. She always focuses on learning new things. I really recommend her profile.',
  },
  {
    name: 'Stephanie Mayton',
    title: 'Research Assistant · Access Confidential',
    year: '2018',
    quote:
      "Afton always kept a level head while also making work fun. She's a diligent worker, fast learner, with a great attitude. She was a true asset to the company.",
  },
];
