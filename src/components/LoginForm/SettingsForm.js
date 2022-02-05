import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import usePrint from "@hooks/usePrint";

const SettingsForm = ({
  children,
  isLoading,
  error,
  label,
  errorMessage,
  sx,
  ...props
}) => {
  const print = usePrint();
  return (
    <Paper
      elevation={2}
      sx={{
        ...sx,
        p: "1rem",
        my: "1rem",
      }}
      {...props}
    >
      <Box
        sx={{
          "& .MuiTextField-root": { my: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth={true}>
          <FormLabel sx={{ mb: "1rem" }}>{print && label}</FormLabel>
          {children}
          {error && <FormHelperText error>{errorMessage}</FormHelperText>}
        </FormControl>
      </Box>
    </Paper>
  );
};

export default SettingsForm;
