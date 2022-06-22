import { CircularProgress } from "@material-ui/core";

const Loading = () => (
  <CircularProgress
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  />
);

export default Loading;
