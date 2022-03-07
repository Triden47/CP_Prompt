import { IconButton } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const MoreOptions = (props) => {
  return (
    <>
      <IconButton
        style={{ color: "rgba(255, 255, 255, 0.7)" }}
        onClick={() => {
          props.hide(props.website);
        }}
      >
        <VisibilityOffIcon />
      </IconButton>
    </>
  );
};

export default MoreOptions;
