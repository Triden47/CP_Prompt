import { useState, useContext } from 'react'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox } from '@mui/material'

//components
import { BwContext } from '../../context/BwProvider'


const CheckboxList = () => {
    const [checked, setChecked] = useState([0]);
    const { bw, setBw } = useContext(BwContext)


    const handleToggle = (value) => () => {

        setBw(bw.filter(element => element !== value))

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
            {bw.map((value, key) => {
                const labelId = `checkbox-list-label-${value}`;

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
