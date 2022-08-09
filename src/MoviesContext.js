import React, { useState, createContext } from "react";

export const MoviesContext = createContext();

export const MoviesProvider = (props) => {
  const [movies, setMovies] = useState({ data: [] });

  return (
    <MoviesContext.Provider value={[movies, setMovies]}>
      {props.children}
    </MoviesContext.Provider>
  );
};
