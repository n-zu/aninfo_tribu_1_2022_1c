import { Typography } from "@material-ui/core";

type TitledTextProps = {
  title: string;
  children: React.ReactNode;
};

const TitledText = ({ title, children }: TitledTextProps) => {
  return (
    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
      <Typography variant="overline" style={{ lineHeight: "normal" }}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        style={{ textAlign: "justify", whiteSpace: "pre-line" }}
      >
        {children !== "" ? children : "-"}
      </Typography>
    </div>
  );
};

export default TitledText;
