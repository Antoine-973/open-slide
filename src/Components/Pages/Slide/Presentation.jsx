import * as React from "react";
import Reveal from 'reveal.js';
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import {makeStyles} from '@mui/styles';
import {Grid, IconButton} from "@mui/material";
import './presentation.css'
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {db} from "../../../firebase/firebase";

const useStyles = makeStyles({
    slideContainer: {
        zIndex: 100,
    },
});

export function Presentation() {
    const classes = useStyles();
    const {id} = useParams();
    const navigate = useNavigate();
    const [document, setDocument] = useState([]);
    const [loading, setLoading] = useState(true);

    const initDocument = async () => {
        const path = ref(db, 'documents/' + id + '/slides');
        await onValue(path, (data) => {
                setDocument(data.val());
            }, (error) => {
                console.log(error);
            }
        );
        setLoading(false);
    }
    useEffect(() => {
        initDocument();
    }, []);

    useEffect(() => {
        if (document.length > 0) {
            let deck = new Reveal({
                backgroundTransition: 'slide',
                transition: 'slide',
                viewDistance: 100,
                controlsLayout: 'edges',
                progress: true,
                slideNumber: 'c/t'
            })
            deck.initialize();
        }
    }, [document]);

    const closePres = () => {
        navigate('/slide/' + id);
    }

    return (
            <Grid className={classes.slideContainer}>
                <Grid position={"absolute"} zIndex={10} top={0} left={0} padding={1}>
                    <IconButton onClick={() => {
                        closePres()
                    }}>
                        <CloseIcon/>
                    </IconButton>
                </Grid>
                <div className="reveal">
                    <div className="slides" data-transition="slide">
                        {
                            document && document.map((slide, index) => {
                                return (
                                    <section key={index} data-transition="slide">
                                        {slide.content}
                                    </section>
                                )
                            })
                        }
                    </div>
                </div>
            </Grid>
    );
}