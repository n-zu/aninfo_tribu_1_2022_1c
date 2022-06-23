import React from "react";
import { Typography } from "@mui/material";

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="body1"
    color="textSecondary"
    style={{ justifyContent: "center", width: "100%", display: "flex" }}
  >
    {children}
  </Typography>
);

export default Caption;
