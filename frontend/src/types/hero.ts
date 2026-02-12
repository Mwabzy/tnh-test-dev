export type HeroSlide = {
  id: number;
  title: string;
  description: string;
  imageKey: string; // "accident" | "hospitalview" (or any string)
  order?: number;
  isActive?: boolean;

  // Optional if backend returns it
  imageUrl?: string;
};
