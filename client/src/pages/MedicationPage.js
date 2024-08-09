import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { endpoints } from "../api";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(5),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  paddingTop: "20px !important",
  paddingBottom: "20px !important",
}));

function CustomTabPanel({ children, value, index, ...other }) {
  const { time, period, relation } = children; 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Time:-</span> {time} {period}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Recommended:-</span>{" "}
            <span style={{ textTransform: "capitalize" }}>{relation}</span>
          </Typography>
        </Box>
      )}
    </div>
  );
}


CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const MedicationPage = () => {
  const [value, setValue] = useState(0);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [tableData, setTableData] = useState([]);
  const [expanded, setExpanded] = React.useState(null);
  const [cookies] = useCookies(["token"]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = cookies.token;
    if (userCookie) {
      const decoded = jwtDecode(userCookie);
      setUserAuthenticated(true);
      setUserId(decoded.id);
    } else {
      setUserAuthenticated(false);
      setUserId("");
    }
  }, [cookies, userId, userAuthenticated]);

  useMemo(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          `${endpoints.setmedications.all}${userId}/medications`
        );
        if (response.status == 200) {
          setTableData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (userAuthenticated) {
      fetchSchedule();
    } else {
      console.log("User not authenticated");
    }
  }, [cookies, userAuthenticated]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAccordianChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  console.log(tableData);

  const handleToschedule = ()=>{
    if(userAuthenticated){
        navigate("/form")
    }
  }

  const handleDelete = async (id, userId) => {
    try {
      const response = await axios.delete(
        `${endpoints.setmedications.all}${userId}/medications/${id}`
      );
      if (response.status === 200) {
        setSnackbarMessage("Item deleted successfully");
        setSnackbarOpen(true);
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setSnackbarOpen(false);
  };

  const vertical = "bottom"
  const horizontal = "right"
  return (
    <Box style={{ marginTop: "180px" }}>
      <Container maxWidth="xl">
        <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ my: 2 }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="">
            Medication
          </Link>
        </Breadcrumbs>

        <Stack direction="row" alignContent="center">
          <Typography variant="h4" fontWeight="400">
            Medication Data
          </Typography>
          <Box style={{ flexGrow: "1" }} />
          <Button
            size="large"
            variant="contained"
            startIcon={<AddIcon />}
            style={{ backgroundColor: "#10847E" }}
            onClick={handleToschedule}
          >
            Add
          </Button>
        </Stack>

        <Box sx={{ width: "100%", textAlign: "start" }}>
          <Stack my={3}>
            {tableData.map((item, index) => (
              <Accordion
              key={item._id}
              expanded={expanded === item._id}
                onChange={handleAccordianChange(item._id)}
              >
                <AccordionSummary
                  aria-controls={`${item._id}-content`}
                  id={`${item._id}-header`}
                >
                  <Typography>
                    {item.name} {`Item ${index + 1}`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack style={{position:"relative"}}>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Frequency:-</span>{" "}
                      {item.frequency}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Start Date:-</span>{" "}
                      {formatDate(item.startDate)}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>End Date:-</span>{" "}
                      {formatDate(item.endDate)}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Description:-</span>{" "}
                      {item.note}
                    </Typography>
                    <Typography>
                      {" "}
                      <span style={{ fontWeight: "bold" }}>Times:-</span>{" "}
                    </Typography>

                    <Box style={{position:"absolute", top:"10px", right:"10px", color:"#10847E"}}>
                      <IconButton color="inherit" onClick={()=>handleDelete(item._id,userId)}>
                        <DeleteOutlineOutlinedIcon/>
                      </IconButton>
                    </Box>
                  </Stack>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="dynamic tabs example"
                      >
                        {item.times.map((item, index) => (
                          <Tab key={item.id} label={`Dose ${index + 1}`} />
                        ))}
                      </Tabs>
                    </Box>
                    {item.times.map((item, index) => (
                      <CustomTabPanel key={index} value={value} index={index}>
                        {item}
                      </CustomTabPanel>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Box>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MedicationPage;
