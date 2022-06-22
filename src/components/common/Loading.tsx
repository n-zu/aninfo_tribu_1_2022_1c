import { CircularProgress } from "@material-ui/core";

const Loading = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    }}
  >
    <CircularProgress />
  </div>
);

export default Loading;
