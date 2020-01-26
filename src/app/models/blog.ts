export class Blog {
  id: number;
  category_id: number;
  category_name: string;
  title: string;
  user_id: number;
  short_desc: string;
  description: string;
  image: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: Date;
}
