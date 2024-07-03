import { useContext } from "react";
import { Card, Typography, Stack, IconButton, Paper } from "@mui/material";
import { WorkContext } from "../../store/AppContext";
import InfoBox from "../../components/HomePageComp/InfoBox";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Unstable_Grid2";
import InfoIcon from "@mui/icons-material/Info";

const HomeInfoSection = () => {
  const [isletme, setIsletme] = useContext(WorkContext);

  return (
    <Card sx={{ p: 1, m: 2 }}>
      <Grid container spacing={2}>
        <Grid item="true">
          <InfoBox />
          <Paper sx={{ p: 1 }}>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <Typography sx={{ color: "primary.main" }} variant="span">
                {isletme ? isletme.unvan : ""}
              </Typography>
              <IconButton aria-label="delete" sx={{ color: "primary.main" }}>
                <EditIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Grid>
        <Grid item="true">
          <Paper sx={{ p: 1 }}>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <Typography sx={{ color: "primary.main" }} variant="span">
                {isletme ? isletme.vergi : ""}
              </Typography>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Grid>
        <Grid item="true">
          <Paper sx={{ p: 1 }}>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <Typography sx={{ color: "primary.main" }} variant="span">
                Id : {isletme ? isletme.id : ""}
              </Typography>

              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Grid>
        <Grid item="true">
          <Paper sx={{ p: 1 }}>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <Typography sx={{ color: "primary.main" }} variant="span">
                {isletme ? isletme.mail : ""}
              </Typography>

              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Grid>

        <Grid item="true">
          <Paper sx={{ p: 1 }}>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <Typography sx={{ color: "primary.main" }} variant="span">
                Sektör
              </Typography>
              <Typography sx={{ color: "primary.main" }} variant="span">
                {isletme ? isletme.sektor_ismi : ""}
              </Typography>
              <IconButton aria-label="delete" sx={{ color: "primary.main" }}>
                <EditIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Grid>

        <Grid item="true">
          <Paper sx={{ p: 1 }}>
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={1}
              justifyContent={"center"}
            >
              <Typography sx={{ color: "primary.main" }} variant="span">
                Telefon 1
              </Typography>
              <Typography sx={{ color: "primary.main" }} variant="span">
                {isletme ? isletme.tel1.numberlong : ""}
              </Typography>
              <IconButton aria-label="delete" sx={{ color: "primary.main" }}>
                <EditIcon />
              </IconButton>
              <Typography sx={{ color: "primary.main" }} variant="span">
                Telefon 2
              </Typography>
              <Typography sx={{ color: "primary.main" }} variant="span">
                {isletme ? isletme.tel2.numberlong : ""}
              </Typography>
              <IconButton aria-label="delete" sx={{ color: "primary.main" }}>
                <EditIcon />
              </IconButton>
              <Typography sx={{ color: "primary.main" }} variant="span">
                Yetkili
              </Typography>
              <Typography sx={{ color: "primary.main" }} variant="span">
                {isletme ? isletme.yetkili : ""}
              </Typography>
              <IconButton aria-label="delete" sx={{ color: "primary.main" }}>
                <EditIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Grid>

        <Grid item="true">
          <Paper sx={{ p: 1 }}>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <Typography sx={{ color: "primary.main" }} variant="span">
                Adres
              </Typography>
              <Typography sx={{ color: "primary.main" }} variant="span">
                {isletme ? isletme.adres : ""}
              </Typography>
              <IconButton aria-label="delete" sx={{ color: "primary.main" }}>
                <EditIcon />
              </IconButton>
              <Typography sx={{ color: "primary.main" }} variant="span">
                Notlar
              </Typography>
              <Typography sx={{ color: "primary.main" }} variant="span">
                {isletme ? isletme.bilgi : ""}
              </Typography>
              <IconButton aria-label="delete" sx={{ color: "primary.main" }}>
                <EditIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HomeInfoSection;
