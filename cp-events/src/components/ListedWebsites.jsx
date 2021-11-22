import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

/*global chrome */

const CheckboxList = () => {
    const [checked, setChecked] = React.useState([0]);
    const [ blacklist, setBlacklist ] = React.useState([])
    const [ unchecked, setUnchecked ] = React.useState([])

    React.useEffect(() => {
        const hiddenList = ((websiteId) => {
            chrome.storage.sync.get('hiddenWebsites', function (result) {
                var arr = result.hiddenWebsites;
                if(typeof arr === 'undefined')
                    setBlacklist([])
                else
                    setBlacklist(arr)
                console.log(blacklist)
            });
        })
        hiddenList()
    }, [])

    const handleToggle = (value) => () => {
        // console.log(value)
        if(unchecked.find(element => element === value) !== undefined) {
          setUnchecked(unchecked.filter(element => element !== value))
        } else {
          setUnchecked((prevArr) => [...prevArr, value])
        }

        // console.log(unchecked)

        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
            {blacklist.map((value, key) => {
                const labelId = `checkbox-list-label-${value}`;
                {/* console.log(value) */}

                return (
                    <ListItem key={value} disablePadding>
                        <ListItemButton
                            role={undefined}
                            onClick={handleToggle(value)}
                            dense
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) === -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={value}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default CheckboxList;
