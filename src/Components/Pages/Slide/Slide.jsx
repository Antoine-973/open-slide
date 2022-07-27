import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Slideshow} from "@mui/icons-material";
import {Button, Grid, TextField} from "@mui/material";
import {onValue, ref, update} from "firebase/database";
import {db} from "../../../firebase/firebase";
import Box from "@mui/material/Box";
import QuillCursors from "quill-cursors";
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import {QuillBinding} from 'y-quill'
import Quill from 'quill'

export const Slide = () => {
    localStorage.removeItem('quill') ;
    const {id} = useParams();
    const [document, setDocument] = useState({loading: true, data: {}});
    const navigate = useNavigate();
    const [slideId, setSlideId] = useState(0);
    const editorRef = useRef(null);
    const [isQuill, setIsQuill] = useState(false);

    const initDocument = () => {
        const path = ref(db, 'documents/' + id);
        onValue(path, (data) => {
                setDocument({loading: false, data: {key: data.key, ...data.val()}});
            }
            , (error) => {
                console.error(error);
            }
        );
    }

    const updateDocument = () => {
        const path = ref(db, 'documents/' + id);
        update(path, document.data).then(() => {
                console.log('Document updated');
            }
            , (error) => {
                console.error(error);
            }
        );
    };


    const updateSlide = (data) => {
       const path = ref(db, 'documents/' + id + '/slides/' + slideId);
       update(path, {content:data}).then(() => {
            console.log('Slide updated');
       }) ;
    } ;

    const handleAddSlide = () => {
        const path = ref(db, 'documents/' + id);
        const updates = {};
        updates['/slides'] = [...document.data.slides, {content: '', position: document.data.slides.length + 1}];
        update(path, updates).then(() => {
            console.log('Slide added');
        }, (error) => {
            console.error(error);
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

    useEffect(() => {
        if(editorRef.current!==null && localStorage.getItem('quill') !== 'set'){
            localStorage.setItem('quill', 'set');

            Quill.register('modules/cursors', QuillCursors)
            const quill = new Quill(editorRef.current, {
                modules: {
                    cursors: true,
                    toolbar: isQuill === false ? [
                        // adding some basic Quill content features
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block']
                    ] : false,
                    history: {
                        // Local undo shouldn't undo changes
                        // from remote users
                        userOnly: true
                    }
                },
                placeholder: 'Start collaborating...',
                theme: 'snow' // 'bubble' is also great
            })

            const ydoc = new Y.Doc();

            const provider = new WebsocketProvider(
                'wss://demos.yjs.dev', 'quill-demo-room', ydoc
            )

            const ytext = ydoc.getText('quill');

            const binding = new QuillBinding(ytext, quill, provider.awareness);

            window.addEventListener('blur', () => { quill.blur() });

            quill.on('text-change', (delta, old, source) => {
                if (source === 'user') {
                    updateSlide(quill.getText()) ;
                }
            }) ;
        }
        if(!isQuill) {
            setIsQuill(true);
        }
    },[slideId])

    const handleSlideChange = async (index) => {
        setSlideId(index);
        let data = '' ;
        const path = ref(db,'documents/' + id + '/slides/' + index) ;
        await onValue(path,async (slideData) => {
            data = await slideData.val()['content'] ;
        }) ;
        editorRef.current.children[0].children[0].innerHTML =  data ;
    } ;

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
                                return(
                                    <Button onClick={() => {handleSlideChange(index);}}>{index+1}</Button>
                                )
                            }
                        )}
                    </Box>
                    <Box>

                        <div ref={editorRef} id="editor" className={"editor"} />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}