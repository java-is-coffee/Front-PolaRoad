import { IconButton, InputAdornment, TextField } from "@mui/material";

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";

const HeaderSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useSearchParams();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    query.set("search", searchInput);
    setQuery(query);
  };

  return (
    <div>
      <form method="get" action="/explore" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          name="searchInput"
          placeholder="ex)도보여행, #글램핑, #빵지순례"
          fullWidth
          value={searchInput}
          onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
            setSearchInput(value.target.value);
          }}
          required
          sx={{
            ".MuiOutlinedInput-root": { fontSize: "1.3rem" },
            width: "20vw",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  type="submit"
                  edge="end"
                  sx={{
                    backgroundColor: "#13c4a3",
                    marginRight: "-1px",
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
};

export default HeaderSearch;
