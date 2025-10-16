# Post-Mortem Content Structure

This directory contains technical post-mortems for game development projects and other development work.

## Directory Structure

```
src/data/blog/
├── index.ts                      # Main export (import from here)
├── posts.ts                      # All post-mortem content
├── types.ts                      # TypeScript interfaces
└── templates/
    └── post-mortem-template.ts  # Template for new post-mortems
```

## Adding New Post-Mortems

1. Open `posts.ts` and follow the existing pattern
2. Use `templates/post-mortem-template.ts` as a reference
3. Add your new post-mortem to the exports:

```typescript
export const yourGamePostMortem: BlogPost = {
  metadata: {
    slug: 'your-game-slug',
    title: 'Your Game Title',
    // ... rest of metadata
  },
  content: [
    // ... post-mortem sections
  ],
};
```

4. Register it in `index.ts`:

```typescript
import { yourGamePostMortem } from './posts';

export const blogRegistry: BlogPostRegistry = {
  [yourGamePostMortem.metadata.slug]: yourGamePostMortem,
  // ... other posts
};
```

## Post-Mortem Template Structure

All game development post-mortems follow this consistent structure:

1. **Game Showcase** - Hero image, description, links
2. **About** - Inspiration, motivation, optional quote
3. **Technical Overview** - Tech stack, performance specs
4. **Engineering Insights** - Implementation details
5. **Design & UX Insights** - Player experience
6. **Key Takeaways** - Lessons learned
7. **Post-Mortem Reflections** - What's next
8. **AI as Creative Partner** - Tooling & workflow
9. **Feedback Form** - Community engagement

## Helper Functions

```typescript
import { getBlogPost, getAllBlogPosts } from '@/data/blog';

// Get all post-mortems
const allPosts = getAllBlogPosts();

// Get specific post-mortem by slug
const post = getBlogPost('nyx-felis-post-mortem');
```

## Benefits of This Structure

- ✅ **Simple** - One system for one purpose (post-mortems)
- ✅ **Maintainable** - Clear structure, easy to add new posts
- ✅ **Consistent** - Template ensures quality and structure
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Focused** - No unnecessary complexity
