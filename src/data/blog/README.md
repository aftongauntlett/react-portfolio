# Blog Content Structure

This directory contains all blog posts organized by category with reusable templates.

## Directory Structure

```
src/data/blog/
├── index.ts                      # Main export (import from here)
├── types.ts                      # TypeScript interfaces
├── templates/                    # Reusable post structures
│   ├── post-mortem-template.ts  # Pattern for game dev post-mortems
│   ├── tech-blog-template.ts    # Pattern for technical articles
│   └── career-blog-template.ts  # Pattern for career reflections
├── post-mortems/                 # Game development post-mortems
│   ├── nyx-felis.ts
│   └── orbital-order.ts
├── tech/                         # Technical blog posts (future)
└── career/                       # Career-related posts (future)
```

## Adding New Posts

### Post-Mortem (Game Development)

1. Create a new file in `post-mortems/your-game.ts`
2. Follow the structure in `templates/post-mortem-template.ts`
3. Import and add to `index.ts`:

```typescript
import { yourGame } from './post-mortems/your-game';

export const blogPosts = [
  yourGame, // Newest first
  nyxFelisPostMortem,
  orbitalOrderPostMortem,
];
```

### Tech Blog (Future)

1. Create a new file in `tech/your-post.ts`
2. Follow the structure in `templates/tech-blog-template.ts`
3. Import and add to `index.ts`

### Career Blog (Future)

1. Create a new file in `career/your-post.ts`
2. Follow the structure in `templates/career-blog-template.ts`
3. Import and add to `index.ts`

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
import { getPostsByCategory, getFeaturedPosts, getPostBySlug } from '@/data/blog';

// Get all game dev posts
const gamePosts = getPostsByCategory('Game Development');

// Get featured posts for homepage
const featured = getFeaturedPosts();

// Get specific post
const post = getPostBySlug('js13k-2025-post-mortem');
```

## Benefits of This Structure

- ✅ **Scalable** - Easy to add new categories
- ✅ **Maintainable** - One file per post, clear Git diffs
- ✅ **Consistent** - Templates ensure quality
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Organized** - Clear categorization
- ✅ **Searchable** - Helper functions for queries

## Migration Notes

- Old `posts.ts` backed up as `posts-old.ts`
- All imports from `@/data/blog/posts` still work
- No breaking changes to existing code
