import * as React from "react";
import Reveal from 'reveal.js';
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import { makeStyles } from '@mui/styles';
import {Grid} from "@mui/material";
import './presentation.css'

const useStyles = makeStyles({
    slideContainer: {
        zIndex:100,
    },
});

export function Presentation() {
    const classes = useStyles();

    React.useEffect(() => {
        let deck = new Reveal({
            backgroundTransition: 'slide',
            transition: 'slide',
            viewDistance:2,
            controlsLayout: 'edges',
            progress: true,
            slideNumber: 'c/t'
        })
        deck.initialize();
    },[])

    const data = {
        Document: [
            {
                slide1:{
                    title:'content',
                    content:'ceci est le contenu'
                }
            }
        ]
    }

    return (
        <Grid className={classes.slideContainer}>
            <div className="reveal">
                <div className="slides" data-transition="slide">
                    <section data-transition="slide" data-background-color="aquamarine">
                        <h1>🍦</h1>
                    </section>
                    <section data-transition="slide" data-background-color="#283b95">
                        <h1>🍰🍰🍰</h1>
                    </section>
                    <section data-transition="slide">
                        miam
                    </section>
                </div>
            </div>
        </Grid>
    );
}