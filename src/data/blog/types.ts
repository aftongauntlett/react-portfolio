export interface BlogPostSection {
  type:
    | 'heading'
    | 'paragraph'
    | 'list'
    | 'separator'
    | 'links'
    | 'blog-image'
    | 'image'
    | 'image-grid'
    | 'feedback-form'
    | 'game-showcase'
    | 'design-showcase'
    | 'pull-quote'
    | 'color-palette'
    | 'tech-grid';
  content?: string;
  items?: string[];
  level?: 1 | 2 | 3 | 4;
  src?: string;
  alt?: string;
  caption?: string;
  size?: 'small' | 'medium' | 'large';
  images?: Array<{ src: string; alt: string; caption?: string }>;
  tags?: string[];
  links?: Array<{
    url: string;
    text: string;
    type: 'github' | 'demo' | 'external' | 'figma';
  }>;
  formTitle?: string;
  formDescription?: string;
  author?: string;
  citation?: string;
  colors?: Array<{ name: string; hex: string; usage: string }>;
  techStack?: Array<{ name: string; category: string }>;
}

export interface BlogPostMetadata {
  title: string;
  subtitle?: string;
  description: string;
  publishDate: string;
  slug: string;
  author: string;
  readTime?: string;
  tags?: string[];
  categories?: string[];
  featured?: boolean;
}

export interface BlogPost {
  metadata: BlogPostMetadata;
  sections: BlogPostSection[];
}

export interface BlogPostRegistry {
  [slug: string]: BlogPost;
}
