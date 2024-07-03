import { Typography, Stack, IconButton, Paper } from "@mui/material";
import { Fragment } from "react";

const InfoBox = ({ data, title }) => {
  return (
    <Fragment>
      <Stack
        direction="row"
        spacing={1}
        
        alignItems={"center"}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: "primary.main" }} variant="span">
          {data ? data : ""}
        </Typography>
      </Stack>
    </Fragment>
  );
};

export default InfoBox;
