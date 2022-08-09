import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {Fragment} from "react";

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event._currentValue();
            }}
            {...props}

        />
    );
}

export default function NavTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" style={{backgroundColor:'#BEC3C2'}}>


                    <LinkTab label="Dash Board" href="/dash"  />

                    <LinkTab label="Product" href="/product"  />


                    <LinkTab label="Cart" href="/cart" />


            </Tabs>
            <Typography
                variant='h5'
                style={{
                    fontWeight:'bold',
                    marginLeft:'90%',
                    marginTop:'-40px'
                }}
            >
                Nilanga
            </Typography>
        </Box>
    );
}
