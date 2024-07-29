import { Typography, Stack } from "@mui/material";
import { Fragment, memo } from "react";

const InfoBox = ({ data, title, para = "para" }) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={1} alignItems={"center"}>
        <Typography
          variant="subtitle1"
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          {title}
        </Typography>
        {para === "para" ? (
          <Typography sx={{ color: "primary.main" }} variant="span">
            {data ? data : ""}
          </Typography>
        ) : (
          <Typography sx={{ color: "primary.main" }} variant="span">
            {data
              ? `${new Intl.NumberFormat("tr-TR", {
                  minimumFractionDigits: 2,
                }).format(data)} TL`
              : ""}
          </Typography>
        )}
      </Stack>
    </Fragment>
  );
};

export default memo(InfoBox);
