import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, IconButton, Select, MenuItem, styled } from "@mui/material";
import { useTheme } from "@emotion/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const StyledSelect = styled(Select)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "transparent",
  },
  minWidth: "120px",
}));

export default function Filter() {
  const theme = useTheme();
  const [age, setAge] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const navigate = useNavigate(); // Use useNavigate hook

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/products/search?searchQuery=${query}`
      );
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (event, value) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);
    handleSearch(inputValue);
  };

  const defaultOptions = [
    { productName: "Paracetamol", year: 1994 },
    { productName: "Aspirin", year: 1972 },
    { productName: "Ibuprofen", year: 1974 },
    { productName: "Amoxicillin", year: 2008 },
    { productName: "Ciprofloxacin", year: 1957 },
    { productName: "Omeprazole", year: 1993 },
    { productName: "Atorvastatin", year: 1994 },
  ];

  const handleSelect = (value) => {
    const selectedItem = searchResults.find(
      (item) => item.productName === value
    );
    if (selectedItem) {
      navigate(`/productDetails/${selectedItem._id}?item=${1}`);
    }
  };

  const renderStartAdornment = () => (
    <>
      <select
        value={age}
        onChange={handleChange}
        style={{
          marginLeft: "6px",
          color: "#696969",
          backgroundColor: "transparent",
          width: "100px",
          textAlign: "center",
          border: "none",
          fontSize: "16px",
        }}
      >
        <option>category</option>
      </select>
      <Box
        style={{
          height: "20px",
          borderLeft: "1px solid #696969",
          marginLeft: "5px",
        }}
      />
    </>
  );

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      sx={{ width: 500, padding: "0px" }}
      options={searchResults.map((option) => option.productName)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search for Medicine and Healthcare items."
          InputProps={{
            ...params.InputProps,
            type: "search",
            startAdornment: renderStartAdornment(),
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          onChange={handleInputChange}
        />
      )}
      onChange={(event, value) => handleSelect(value)}
    />
  );
}
