export interface BlogPostSection {
  type:
    | 'heading'
    | 'paragraph'
    | 'list'
    | 'separator'
    | 'links'
    | 'blog-image'
    | 'feedback-form'
    | 'game-showcase'
    | 'pull-quote';
  content?: string;
  items?: string[];
  level?: 1 | 2 | 3 | 4;
  src?: string;
  alt?: string;
  caption?: string;
  size?: 'small' | 'medium' | 'large';
  tags?: string[];
  links?: Array<{
    url: string;
    text: string;
    type: 'github' | 'demo' | 'external';
  }>;
  formTitle?: string;
  formDescription?: string;
  author?: string;
  citation?: string;
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
