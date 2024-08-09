import React from "react";
import {
  Box,
  Checkbox,
  Stack,
  Button,
  Drawer,
  Typography,
  IconButton,
  Divider,
  Grid,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckIcon from "@mui/icons-material/Check";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { allProduct } from "../../redux/product/Action";
import { useDispatch } from "react-redux";

const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

const FILTER_CATEGORY_OPTIONS = ["Shoes", "Apparel", "Accessories"];

const FILTER_PRICE_OPTIONS = [
  { value: "0,1000", label: "Less than 1,000" },
  { value: "1000,3000", label: "1,000 - 3,000" },
  { value: "3000,5000", label: "3,000 - 5,000" },
  { value: "5000,7000", label: "5,000 - 7,000" },
  { value: "7000,9000", label: "7,000 - 9,000" },
  { value: "9000+", label: "more than 9,000" },
];

const FILTER_COLOR_OPTIONS = [
  "Red",
  "Yellow",
  "Blue",
  "Green",
  "Black",
  "White",
  "Orange",
  "Gray",
];

const ClearButton = ({ children, onClick, ...props }) => {
  return (
    <Button
      size="small"
      type="submit"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        "&:hover": {
          color: "black",
        },
      }}
      onClick={onClick}
      {...props}
    >
      {children}
      <HighlightOffIcon sx={{ color: "grey", ml: 0.5 }} />
    </Button>
  );
};

const ProductFilterSidebar = ({
  openFilter,
  onOpenFilter,
  onCloseFilter,
  queryParams,
  fetchData
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCategoryChange = (category) => {
    const updatedParams = new URLSearchParams(queryParams);

    if (updatedParams.has("category")) {
      const categories = updatedParams.get("category").split(",");
      if (categories.includes(category)) {
        categories.splice(categories.indexOf(category), 1);
      } else {
        categories.push(category);
      }
      updatedParams.set("category", categories.join(","));
    } else {
      updatedParams.set("category", category);
    }

    navigate(`/shop?${updatedParams.toString()}`);
    dispatch(allProduct(Object.fromEntries(updatedParams.entries())));
  };

  const handlePriceChange = (price) => {
    const updatedParams = new URLSearchParams(queryParams);
    updatedParams.set("price", price);

    navigate(`/shop?${updatedParams.toString()}`);
    dispatch(allProduct(Object.fromEntries(updatedParams.entries())));
  };

  const handleColorChange = (color) => {
    const updatedParams = new URLSearchParams(queryParams);

    if (updatedParams.has("color")) {
      const colors = updatedParams.get("color").split(",");
      if (colors.includes(color)) {
        colors.splice(colors.indexOf(color), 1);
      } else {
        colors.push(color);
      }
      updatedParams.set("color", colors.join(","));
    } else {
      updatedParams.set("color", color);
    }

    navigate(`/shop?${updatedParams.toString()}`);
    dispatch(allProduct(Object.fromEntries(updatedParams.entries())));
  };

  const clearPriceFilters = () => {
    const updatedParams = new URLSearchParams(queryParams);
    updatedParams.delete("price");
    navigate(`/shop?${updatedParams.toString()}`);
    dispatch(allProduct(Object.fromEntries(updatedParams.entries())));
  };

  const clearColorFilters = () => {
    const updatedParams = new URLSearchParams(queryParams);
    updatedParams.delete("color");
    navigate(`/shop?${updatedParams.toString()}`);
    dispatch(allProduct(Object.fromEntries(updatedParams.entries())));
  };

  const handleApplyFilters = () => {
    onCloseFilter();
    dispatch(allProduct({}));
  };

  return (
    <>
      <Button onClick={onOpenFilter} endIcon={<FilterAltOutlinedIcon />}>
        Filter
      </Button>

      <Drawer
        anchor="left"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: {
            width: 380,
            border: "none",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "0em",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
            },
            position: "relative",
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 1,
            py: 2,
            backgroundColor: "#fff",
            borderBottom: "1px solid #A8A8A8",
            position: "sticky",
            top: 0,
            zIndex: 99,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ ml: 1, fontWeight: "bold", fontSize: "22px" }}
          >
            Product Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <CloseOutlinedIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>

        <Stack spacing={3} sx={{ p: 1 }}>
          <Accordion
            sx={{ margin: "0px !important", boxShadow: "none", border: "none" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="h6">Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {queryParams.category && (
                <ClearButton
                  onClick={() => {
                    const updatedParams = new URLSearchParams(queryParams);
                    updatedParams.delete("category");
                    navigate(`/shop?${updatedParams.toString()}`);
                  }}
                >
                  Clear
                </ClearButton>
              )}
              {FILTER_CATEGORY_OPTIONS.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={
                        queryParams.category
                          ? queryParams.category.split(",").includes(item)
                          : false
                      }
                      onChange={() => handleCategoryChange(item)}
                    />
                  }
                  label={item}
                  style={{ width: "100%" }}
                />
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ margin: "0px !important", boxShadow: "none", border: "none" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography variant="h6">Price</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {queryParams.price && (
                <ClearButton onClick={clearPriceFilters}>Clear</ClearButton>
              )}
              {FILTER_PRICE_OPTIONS.map((item) => (
                <FormControlLabel
                  key={item.value}
                  sx={{ width: "100%" }}
                  control={
                    <Checkbox
                      checked={
                        queryParams.price
                          ? queryParams.price === item.value
                          : false
                      }
                      onChange={() => handlePriceChange(item.value)}
                    />
                  }
                  label={item.label}
                />
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ margin: "0px !important", boxShadow: "none", border: "none" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography variant="h6">Color</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {queryParams.color && (
                <ClearButton onClick={clearColorFilters}>Clear</ClearButton>
              )}
              <Grid container gap={2} sx={{ paddingBottom: "20px" }}>
                {FILTER_COLOR_OPTIONS.map((color) => (
                  <Grid item key={color} xs={5}>
                    <Box
                      width={30}
                      height={30}
                      bgcolor={color}
                      onClick={() => handleColorChange(color)}
                      sx={{
                        cursor: "pointer",
                        borderRadius: "50%",
                        textAlign: "center",
                        position: "relative",
                        border: queryParams.color
                          ? queryParams.color.split(",").includes(color)
                            ? "2px solid #000"
                            : "2px solid #808080"
                          : "2px solid #808080",
                      }}
                    >
                      {queryParams.color &&
                        queryParams.color.split(",").includes(color) && (
                          <CheckIcon
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                        )}
                      <Typography
                        variant="caption"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "120%",
                          transform: "translate(0%, -50%)",
                        }}
                      >
                        {color}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Box flexGrow={1} />
        <Box
          sx={{
            p: 2,
            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            zIndex: "99",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {queryParams.category && queryParams.color && queryParams.price && (
            <ClearButton
              fullWidth
              onClick={() => {
                const updatedParams = new URLSearchParams(queryParams);
                updatedParams.delete("category");
                updatedParams.delete("price");
                updatedParams.delete("color");
                navigate(`/shop?${updatedParams.toString()}`);
              }}
            >
              Clear All
            </ClearButton>
          )}
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="outlined"
            sx={{
              my: 1,
              bgcolor: "#000",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                border: "1px solid #000",
                color: "#000",
              },
            }}
            onClick={handleApplyFilters}
          >
            Show {fetchData?.products?.length} Products
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default ProductFilterSidebar;
