import react, {useContext} from 'react'
import {AuthContext} from "../../Provider/AuthProvider";
import Navbar from "../../Libs/Navbar";
import {Button, Grid, Typography} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const Slide = () => {
    const {  auth, setAuthData } = useContext(AuthContext);
    console.log(auth) ;

    return(
        <Grid container direction={"column"} gap={6}>
            <Grid item>
                <Navbar/>
            </Grid>
            <Grid item>
                <span>Page de slides</span>
            </Grid>
        </Grid>
    )
}