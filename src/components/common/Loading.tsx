import { CircularProgress, CircularProgressProps } from "@mui/material";

type Props = {
  center?: boolean;
  style?: any;
} & CircularProgressProps;

const Loading = ({ center = true, ...rest }: Props) => (
  <div
    style={
      center
        ? {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }
        : undefined
    }
  >
    <CircularProgress {...rest} />
  </div>
);

export default Loading;
