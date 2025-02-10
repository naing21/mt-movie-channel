import React, { useState } from "react";
import Header from "./Header";
import SearchBox from "./SearchBox";

const MovieSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Header setSearchQuery={setSearchQuery} />
      <SearchBox searchQuery={searchQuery} />
    </div>
  );
};

export default MovieSearchPage;
