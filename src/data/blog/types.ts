export interface BlogPostSection {
  type:
    | 'heading'
    | 'paragraph'
    | 'list'
    | 'separator'
    | 'links'
    | 'blog-image'
    | 'feedback-form'
    | 'game-showcase';
  content?: string;
  items?: string[]; // For lists
  level?: 1 | 2 | 3 | 4; // For heading levels
  src?: string; // For blog-image and game-showcase
  alt?: string; // For blog-image and game-showcase
  caption?: string; // For blog-image and game-showcase
  size?: 'small' | 'medium' | 'large'; // For blog-image sizing
  tags?: string[]; // For game-showcase tags
  links?: Array<{
    url: string;
    text: string;
    type: 'github' | 'demo' | 'external';
  }>; // For styled link sections and game-showcase
  formTitle?: string; // For feedback form
  formDescription?: string; // For feedback form
}

export interface BlogPostMetadata {
  title: string;
  subtitle?: string; // Optional subtitle for posts
  description: string;
  publishDate: string;
  slug: string;
  author: string;
  readTime?: string;
  tags?: string[];
  // Enhanced for filtering/sorting
  categories?: string[]; // Primary categories for filtering
  featured?: boolean; // For highlighting important posts
}

export interface BlogPost {
  metadata: BlogPostMetadata;
  sections: BlogPostSection[];
}

export interface BlogPostRegistry {
  [slug: string]: BlogPost;
}
