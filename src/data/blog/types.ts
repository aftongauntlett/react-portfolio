export interface BlogPostSection {
  type: 'heading' | 'paragraph' | 'list' | 'separator' | 'links' | 'blog-image' | 'feedback-form';
  content?: string;
  items?: string[]; // For lists
  level?: 1 | 2 | 3 | 4; // For heading levels
  src?: string; // For blog-image
  alt?: string; // For blog-image
  caption?: string; // For blog-image
  links?: Array<{
    url: string;
    text: string;
    type: 'github' | 'demo' | 'external';
  }>; // For styled link sections
  formTitle?: string; // For feedback form
  formDescription?: string; // For feedback form
}

export interface BlogPostMetadata {
  title: string;
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
