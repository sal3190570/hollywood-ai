export type MovieItem = {
  id: string;
  director: string;
  title: string;
  tagLine: string;
  imageLink?: string;
  audioLink: string;
  rating: string;
  releaseYear: string;
  type: string;
  subscriptionRequired?: boolean;
  summary: string;
  tags: string[];
  movieDescription: string;
};



export type CarouselProps = {
  data?: MovieItem[];
};
