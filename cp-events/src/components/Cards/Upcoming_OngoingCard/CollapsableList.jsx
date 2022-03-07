import { Zoom, Badge } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const CollapsableList = (props) => {
  return (
    <div>
      {!props.open ? (
        <Zoom in={!props.open}>
          <IconButton
            aria-label="expand row"
            size="small"
            style={{
              position: "relative",
              top: "3px",
              color: "rgba(255, 255, 255, 0.7)",
            }}
            onClick={() => props.handleClick()}
          >
            <Badge badgeContent={props.children.length} color="primary">
              <KeyboardArrowDownIcon style={{ color: "white" }} />
            </Badge>
          </IconButton>
        </Zoom>
      ) : (
        <IconButton
          aria-label="collapse row"
          size="small"
          onClick={() => props.handleClick()}
          style={{ color: "rgba(255, 255, 255, 0.7)" }}
        >
          <KeyboardArrowUpIcon style={{ color: "white" }} />
        </IconButton>
      )}
    </div>
  );
};

export default CollapsableList;
