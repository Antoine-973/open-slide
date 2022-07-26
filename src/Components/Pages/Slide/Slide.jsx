import  {useContext} from 'react'
import {AuthContext} from "../../Provider/AuthProvider";
import Navbar from "../../Libs/Navbar";
import {Grid} from "@mui/material";
import { getUser} from "../../../firebase/firebase";

export const Slide = () => {
    const {  auth, setAuthData } = useContext(AuthContext);
    console.log(auth) ;
    console.log(getUser()) ;
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