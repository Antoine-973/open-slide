import $, {useContext} from 'react'
import {Button, Container, Grid, IconButton, Typography} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Navbar from "../../Libs/Navbar";
import {AuthContext} from "../../Provider/AuthProvider";

const documents = [
    {
        "title": "purple",
        "content": "minivan",
        "registration": new Date('2017-01-03'),
        "capacity": 7
    },
    {
        "color": "red",
        "type": "station wagon",
        "registration": new Date('2018-03-03'),
        "capacity": 5
    },
]

export const DocumentList = () => {

    const {  auth, setAuthData } = useContext(AuthContext);
    console.log(auth) ;

    return(
        <Grid container direction={"column"} gap={6}>
            <Grid item>
                <Navbar/>
            </Grid>
            <Grid item>
                <Button size={"large"} variant={"contained"} startIcon={<AddBoxIcon />}>
                    Créer une présentation
                </Button>
            </Grid>
            <Grid item container border={1} borderColor={"red"} justifyItems={"flex-start"} gap={2} px={6}>
                <Typography  variant={"h6"}>Mes présentations</Typography>
                <Grid container direction={"row"} justifyContent={"flex-start"} alignItems={"flex-start"} wrap gap={6}>
                    <Grid item bgcolor={"red"} width={208} height={163}>
                        Test
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}