import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Input,
  Slide,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 80;

const StyledSearchbar = styled("div")(({ theme }) => ({
  backdropFilter: "blur(8px)",
  backgroundColor: `rgba(#fff, 0.8)`,
  top: 0,
  left: 0,
  right:0,
  zIndex: 99,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  [theme.breakpoints.up("md")]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function Searchbar({ textColor }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <IconButton
          onClick={handleOpen}
          size="large"
          sx={{
            // p: 0,
            color: textColor || "#fff",
          }}
        >
          <SearchIcon/>
        </IconButton>

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  {/* Iconify can be replaced with any other icon component or an SVG */}
                 <SearchIcon/>
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
