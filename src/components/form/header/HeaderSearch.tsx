import { IconButton, InputAdornment, TextField } from "@mui/material";

import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import useStoreValue from "hooks/storeValue/useStoreValue";
import { setSearchText } from "../../../redux/reducers/explore/filterReducer";

const HeaderSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  // const { setPostList } = useExploreHooks();

  const navigate = useNavigate();

  // const dispatch = useDispatch();

  const { setValue } = useStoreValue();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate(`?search=${searchInput}`);
    setValue(setSearchText(searchInput));

    // if (storeRegion !== null) {
    //   navigate(`/explore/${searchInput}?region=${storeRegion}`);
    // } else {
    //   navigate(`/explore/${searchInput}`);
    // }
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
