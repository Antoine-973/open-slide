import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../Provider/AuthProvider";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Slideshow} from "@mui/icons-material";
import {Button, Grid, TextField} from "@mui/material";
import {onValue, ref} from "@firebase/database";
import {db} from "../../../firebase/firebase";
import Box from "@mui/material/Box";

export const Slide = () => {
    const {id} = useParams();
    const [document, setDocument] = useState({loading:true, data: {}});
    const navigate = useNavigate() ;

    const initDocument = () => {
        const path = ref(db, 'documents/' + id);
        console.log(path);
        onValue(path, (data) => {
                setDocument({loading:false, data: {key : data.key, ...data.val()}});
            }
            , (error) => {
                console.log(error);
            }
        );
    }

    useEffect(() => {
        initDocument();
    }, []);

    const handleDiaporama = () => {
        navigate('/slide/'+id+'/presentation');
    }

    return(
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Slideshow sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}  onClick={() => {navigate('/')}} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            onClick={() => {navigate('/')}}
                        >
                            Open Slides
                        </Typography>
                        <TextField value={document.data.title}></TextField>
                        <Slideshow sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}  onClick={() => {navigate('/')}} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            onClick={() => {navigate('/')}}
                        >
                            Open Slides
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Grid container direction={"column"} gap={6}>
                <Grid item>
                    <Box><Button onClick={handleDiaporama}>Diaporama</Button></Box>
                    <Box>
                        {document.data?.slides?.map((slide, index) => {
                            return(
                                <Box key={index}>
                                    <Box>{slide.title}</Box>
                                    <Box>{slide.content}</Box>
                                </Box>
                            )
                        }
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}