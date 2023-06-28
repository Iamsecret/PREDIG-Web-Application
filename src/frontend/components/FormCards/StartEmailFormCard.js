import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

const StartEmailFormCard = ({ formik, button_text, is_simulation }) => {
  let theme = useTheme();

  return (
    <Paper
      sx={{
        margin: "1em",
        border: "6px solid",
        borderColor: theme.palette.secondary.main,
      }}
      elevation={5}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "1em",
        }}
      >
        <Typography sx={{ paddingRight: "2em" }}>
          When you submit a run, the e-mail address used will be publicly
          visible in the RUNS tab. This makes it possible for you to easily
          search for completed runs.
        </Typography>

        {is_simulation ? (
          <FormControlLabel
            label="Create animation"
            control={
              <Checkbox
                name="is_animation"
                id="is_animation"
                checked={formik.values["is_animation"]}
                onChange={formik.handleChange}
              />
            }
          />
        ) : (
          <></>
        )}

        <TextField
          sx={{ marginRight: "2em", backgroundColor: "white" }}
          required
          name="email"
          id="email"
          value={formik.values["email"]}
          onChange={formik.handleChange}
          error={Boolean(formik.errors["email"])}
          helperText={
            Boolean(formik.errors["email"]) ? "Valid E-Mail required" : ""
          }
          InputLabelProps={{ shrink: true }}
          label="E-Mail"
          variant="outlined"
        />

        <Button
          sx={{ padding: "1em" }}
          variant="contained"
          type="submit"
          endIcon={<SendIcon />}
        >
          {button_text}
        </Button>
      </Box>
    </Paper>
  );
};

export default StartEmailFormCard;
