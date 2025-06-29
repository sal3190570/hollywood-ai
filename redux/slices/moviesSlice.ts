// redux/slices/moviesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieItemWithDuration } from "@/app/types";

interface MoviesState {
  allMovies: MovieItemWithDuration[];
  isLoading: boolean;
}

const initialState: MoviesState = {
  allMovies: [],
  isLoading: true,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setAllMovies: (state, action: PayloadAction<MovieItemWithDuration[]>) => {
      state.allMovies = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setAllMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
