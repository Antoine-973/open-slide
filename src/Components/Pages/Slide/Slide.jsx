import react, {useContext} from 'react'
import {AuthContext} from "../../Provider/AuthProvider";
import Navbar from "../../Libs/Navbar";
import {Button, Grid, Typography} from "@mui/material";
import {db} from "../../../firebase/firebase";

export const Slide = () => {
    const {  auth, setAuthData } = useContext(AuthContext);

    console.log(db)
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