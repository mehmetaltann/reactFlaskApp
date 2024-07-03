import React from "react";

const InfoBox = () => {
  return (
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
  );
};

export default InfoBox;
