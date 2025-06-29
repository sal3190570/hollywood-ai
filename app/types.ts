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

// Optional: If you want to use the old CarouselProps as an array of MovieItem
export type CarouselProps = MovieItem[];

// MovieDuration type (as before)
export type MovieDuration = { id: string; duration?: number };

// New type: MovieItemWithDuration
export type MovieItemWithDuration = MovieItem & {
  duration: number | null;
};

// Optional: If you want a default object with duration
export const defaultMovieItemWithDuration: MovieItemWithDuration = {
  id: "",
  director: "",
  title: "",
  tagLine: "",
  imageLink: "",
  audioLink: "",
  rating: "",
  releaseYear: "",
  type: "",
  subscriptionRequired: false,
  summary: "",
  tags: [],
  movieDescription: "",
  duration: null,
};

// Original defaultMovieItem for backward compatibility
export const defaultMovieItem: MovieItem = {
  id: "",
  director: "",
  title: "",
  tagLine: "",
  imageLink: "",
  audioLink: "",
  rating: "",
  releaseYear: "",
  type: "",
  subscriptionRequired: false,
  summary: "",
  tags: [],
  movieDescription: "",
};
