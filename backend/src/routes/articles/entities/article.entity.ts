// article.entity.ts
export class Article {
  article_id: number;
  title: string;
  content: string;
  author?: string | null;
  category_id?: number | null;
  published_at: Date;
  highlighted: boolean;
  views_count: number;
  likes_count: number;
}
