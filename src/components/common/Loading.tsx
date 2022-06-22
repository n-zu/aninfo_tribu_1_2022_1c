import { CircularProgress } from "@material-ui/core";

const Loading = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress />
  </div>
);

export default Loading;
