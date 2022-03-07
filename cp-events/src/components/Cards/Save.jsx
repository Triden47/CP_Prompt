import { useContext } from "react";
import { IconButton } from "@mui/material";

import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

//components
import { SaveContext } from "../../context/SaveProvider";

const Save = (props) => {
  const { savedEvent, setSavedEvent } = useContext(SaveContext);

  const handleClick = () => {
    if (
      savedEvent.find((element) => element.event === props.event) === undefined
    ) {
      setSavedEvent((prev) => [
        ...prev,
        { host: props.host, event: props.event },
      ]);
    } else {
      setSavedEvent(
        savedEvent.filter((element) => {
          return element.host !== props.host || element.event !== props.event;
        })
      );
    }
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        style={{ color: "rgba(255, 255, 255, 0.7)" }}
      >
        {savedEvent.find(
          (element) =>
            element.host === props.host && element.event === props.event
        ) === undefined ? (
          <BookmarkAddOutlinedIcon style={{ color: "white" }} />
        ) : (
          <BookmarkAddedIcon style={{ color: "white" }} />
        )}
      </IconButton>
    </>
  );
};

export default Save;
