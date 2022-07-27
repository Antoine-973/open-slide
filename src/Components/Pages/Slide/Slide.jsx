import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Slideshow} from "@mui/icons-material";
import {Button, Grid, TextField} from "@mui/material";
import {onValue, ref, update} from "@firebase/database";
import {db} from "../../../firebase/firebase";
import Box from "@mui/material/Box";

export const Slide = () => {
    const {id} = useParams();
    const [document, setDocument] = useState({loading: true, data: {}});
    const navigate = useNavigate();

    const initDocument = () => {
        const path = ref(db, 'documents/' + id);
        onValue(path, (data) => {
                setDocument({loading: false, data: {key: data.key, ...data.val()}});
            }
            , (error) => {
                console.log(error);
            }
        );
    }

    const updateDocument = () => {
        const path = ref(db, 'documents/' + id);
        update(path, document.data).then(() => {
                console.log('Document updated');
            }
            , (error) => {
                console.log(error);
            }
        );
    }

    const handleAddSlide = () => {
        const path = ref(db, 'documents/' + id);
        const updates = {};
        updates['/slides'] = [...document.data.slides, {content: 'mmm', position: document.data.slides.length + 1}];
        update(path, updates).then(() => {
            console.log('Slide added');
        }, (error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        updateDocument();
    }, [document.data.title])

    const handleTitleChange = (event) => {
        event.preventDefault();
        setDocument({...document, data: {...document.data, title: event.target.value}});
    }

    useEffect(() => {
        initDocument();
    }, []);

    const handleDiaporama = () => {
        navigate('/slide/' + id + '/presentation');
    }

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Slideshow sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} onClick={() => {
                            navigate('/')
                        }}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            Open Slides
                        </Typography>
                        <TextField onChange={handleTitleChange} value={document.data.title}></TextField>
                        <Slideshow sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} onClick={() => {
                            navigate('/')
                        }}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            Open Slides
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Grid container direction={"column"} gap={6}>
                <Grid item>
                    <Box><Button onClick={handleDiaporama}>Diaporama</Button></Box>
                    <Box><Button onClick={handleAddSlide}>Ajouter une slide</Button></Box>
                    <Box>
                        {document.data?.slides?.map((slide, index) => {
                                return (
                                    <Box key={index}>
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