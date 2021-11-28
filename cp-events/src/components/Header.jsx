import { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import { InputBase, Box, AppBar, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

//components
import { SearchContext } from "../context/SearchProvider";
import BlackList from "./BlackList/BlackList";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        // width: 'auto',
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "25ch",
            // '&:focus': {
            //   width: '20ch',
            // },
        },
    },
}));

const Header = () => {
    const { setSearch } = useContext(SearchContext);

    const debounce = (func, delay) => {
        let debounceTimer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const update = debounce(function (e) {
        // console.log(e.target.value)
        setSearch(e.target.value);
    }, 500);

    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                zIndex: "5",
                width: "min(100%, 450px)",
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="static"
                    style={{ backgroundColor: "#0e2e78" }}
                >
                    <Toolbar>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search"
                                inputProps={{ "aria-label": "search" }}
                                onChange={(e) => {
                                    e.persist();
                                    update(e);
                                }}
                                // value={search}
                            />
                        </Search>
                        <BlackList />
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Header;
