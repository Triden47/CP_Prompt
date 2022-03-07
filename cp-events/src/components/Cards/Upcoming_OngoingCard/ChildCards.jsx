import { Collapse, Divider, Link, Tooltip } from "@mui/material";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

//components
import Timer from "../Timer";
import Save from "../Save";

const setDate = (value) => {
  return moment.utc(value).local().format("ddd DD-MMM hh:mm a");
};

const ChildCards = (props) => {
  return (
    <div>
      <Collapse in={props.open} timeout="auto">
        {props.children.map((child) => (
          <div key={`${child.start}${child.event}`}>
            <Divider
              style={{
                border: "0.1px solid",
                margin: "10px",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            />
            <div className="primaryCard">
              <div className="item1">
                <Link
                  color="inherit"
                  underline="hover"
                  href={child.href}
                  target="_blank"
                >
                  {child.event}
                </Link>
              </div>
              <div className="item2">
                <IconButton
                  aria-label="expand row"
                  size="large"
                  onClick={() => props.handleClick()}
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <KeyboardArrowUpIcon style={{ color: "white" }} />
                </IconButton>
              </div>
              <div className="item3">
                <p>
                  {props.started
                    ? "End: " + setDate(child.end)
                    : "Start: " + setDate(child.start)}
                </p>
              </div>
              <div className="item4">
                <Tooltip title="Duration" placement="left" arrow>
                  <p>
                    Dur:{" "}
                    {Math.floor(child.duration / 3600 / 24) > 0
                      ? Math.floor(child.duration / 3600 / 24) + " days"
                      : new Date(child.duration * 1000)
                          .toISOString()
                          .substr(11, 5)}
                  </p>
                </Tooltip>
              </div>
              <div className="item5">
                <Tooltip title="Time Left" placement="left" arrow>
                  <p>
                    TL:{" "}
                    <Timer
                      start_end={props.started ? child.end : child.start}
                    />
                  </p>
                </Tooltip>
              </div>
              <div className="item7">
                <Save host={child.host} event={child.event} />
              </div>
            </div>
          </div>
        ))}
      </Collapse>
    </div>
  );
};

export default ChildCards;
