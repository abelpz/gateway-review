import WorkspaceContainer from "@components/WorkSpaces/WorkspaceContainer";

import { useAuthSession } from "@hooks/useAuthSession";

import {
  Grid,
  Paper,
} from "@mui/material";

const Home = () => {
  const user = useAuthSession();
  return !user ? null : (
    <Grid container>
      <Grid item xs>
        <Paper sx={{ w: "100%" }}>
          <WorkspaceContainer></WorkspaceContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
