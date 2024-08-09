import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Box,
  Container,
  Card,
  CardContent,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { endpoints } from "../../api";
import { useNavigate } from "react-router-dom";

const SchedulePage = () => {
  const [medication, setMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    times: [{ time: "", period: "", relation: "" }],
    startDate: "",
    endDate: "",
    note: "",
  });
  const [cookies] = useCookies(["token"]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate()

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

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "time" || name === "relation" || name === "period") {
      const updatedTimes = [...medication.times];
      updatedTimes[index] = { ...updatedTimes[index], [name]: value };
      setMedication((prevState) => ({
        ...prevState,
        times: updatedTimes,
      }));
    } else {
      setMedication((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddTime = () => {
    setMedication((prevState) => ({
      ...prevState,
      times: [...prevState.times, { time: "", period: "", relation: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(medication);
    if (userAuthenticated && userId) {
      try {
        const response = await axios.post(
          `${endpoints.setmedications.add}${userId}/medications`,
          medication
        );
        console.log(response);
        if(response.status === 200){
        setSnackbarMessage("Medications Schedule Successfully");
        setSnackbarOpen(true);
        navigate("/schedule",)
        }else{
          console.error("Error in adding Medications", response);
        }
      } catch (error) {
        console.error("Error adding to medications:", error);
      }
    } else {
      console.log("User not authenticated or userId not available");
    }
    setMedication({
      name: "",
      dosage: "",
      frequency: "",
      times: [{ time: "", period: "", relation: "" }],
      startDate: "",
      endDate: "",
      note: "",
    });
  };

  const fixedStyle = { margin: "12px 0px" };

  console.log(medication);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const vertical = "bottom";
  const horizontal = "right";

  return (
    <Box style={{ marginTop: "160px", textAlign: "start" }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} my={4}>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                boxShadow: "none",
                borderRadius: "8px",
                border: "1px solid",
                borderColor: "#D3D3D3",
              }}
            >
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Typography variant="h6">Medication Form</Typography>
                  <TextField
                    fullWidth
                    label="Medication Name"
                    name="name"
                    value={medication.name}
                    onChange={(e) => handleChange(e, 0)}
                    style={fixedStyle}
                  />
                  <TextField
                    fullWidth
                    label="Dosage"
                    name="dosage"
                    value={medication.dosage}
                    onChange={(e) => handleChange(e, 0)}
                    style={fixedStyle}
                  />
                  <FormControl fullWidth style={fixedStyle}>
                    <InputLabel>Frequency</InputLabel>
                    <Select
                      value={medication.frequency}
                      onChange={(e) => handleChange(e, 0)}
                      name="frequency"
                    >
                      <MenuItem value="Thrice day">Thrice day</MenuItem>
                      <MenuItem value="Twice day">Twice day</MenuItem>
                      <MenuItem value="Once day">Once day</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="h6">
                    Preferred Time(s) to Take Medication
                  </Typography>
                  {medication.times.map((time, index) => (
                    <Grid container spacing={2} key={index}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Time"
                          type="time"
                          value={time.time}
                          onChange={(e) => handleChange(e, index)}
                          name="time"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={fixedStyle}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth style={fixedStyle}>
                          <InputLabel>AM/PM</InputLabel>
                          <Select
                            value={time.period}
                            onChange={(e) => handleChange(e, index)}
                            name="period"
                          >
                            <MenuItem value="AM">AM</MenuItem>
                            <MenuItem value="PM">PM</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth style={fixedStyle}>
                          <InputLabel>Relation</InputLabel>
                          <Select
                            value={time.relation}
                            onChange={(e) => handleChange(e, index)}
                            name="relation"
                          >
                            <MenuItem value="before">Before</MenuItem>
                            <MenuItem value="after">After</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    variant="contained"
                    onClick={handleAddTime}
                    startIcon={<AddIcon />}
                    style={{ backgroundColor: "#10847E" }}
                  >
                    Add
                  </Button>
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>Start Date (Optional)</InputLabel>
                      <TextField
                        fullWidth
                        type="date"
                        value={medication.startDate}
                        onChange={(e) => handleChange(e, 0)}
                        name="startDate"
                        style={{ ...fixedStyle }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>End Date (Optional)</InputLabel>
                      <TextField
                        fullWidth
                        type="date"
                        // label="End Date"
                        value={medication.endDate}
                        onChange={(e) => handleChange(e, 0)}
                        name="endDate"
                        style={{ ...fixedStyle }}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    label="Note/Description"
                    fullWidth
                    multiline
                    rows={4}
                    name="note"
                    value={medication.note}
                    onChange={(e) => handleChange(e, 0)}
                    style={fixedStyle}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    style={{ backgroundColor: "#10847E", fontWeight: "bold" }}
                  >
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                boxShadow: "none",
                borderRadius: "8px",
                border: "1px solid",
                borderColor: "#D3D3D3",
              }}
            >
              <CardContent>
                <Typography variant="h6">Medication Details</Typography>
                <Typography>Name: {medication.name}</Typography>
                <Typography>Dosage: {medication.dosage}</Typography>
                <Typography>Frequency: {medication.frequency}</Typography>
                <Typography>
                  Preferred Times:
                  {medication.times.map((time, index) => (
                    <span key={index}>
                      {`${time.time} `}
                      {time.relation}
                      <br />
                    </span>
                  ))}
                </Typography>
                <Typography>Start Date: {medication.startDate}</Typography>
                <Typography>End Date: {medication.endDate}</Typography>
                <Typography>Note: {medication.note}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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

export default SchedulePage;
