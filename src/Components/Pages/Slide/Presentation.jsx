import * as React from "react";
import Reveal from 'reveal.js';
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import { makeStyles } from '@mui/styles';
import {Grid, IconButton} from "@mui/material";
import './presentation.css'
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {onValue, ref} from "@firebase/database";
import {db} from "../../../firebase/firebase";

const useStyles = makeStyles({
    slideContainer: {
        zIndex:100,
    },
});

export function Presentation() {
    const classes = useStyles();
    const {id} = useParams();
    const navigate = useNavigate();
    const [document, setDocument] = useState({loading:true, data: {}});


    const initDocument = () => {
        const path = ref(db, 'documents/' + id);
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

    const closePres = () => {
        navigate('/slide/'+id);
    }

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
    console.log(document)
    return (
        <Grid className={classes.slideContainer}>
            <Grid position={"absolute"} zIndex={10} top={0} left={0} padding={1}>
                <IconButton onClick={() => { closePres() }}>
                    <CloseIcon/>
                </IconButton>
            </Grid>
            <div className="reveal">
                <div className="slides" data-transition="slide">
                    {
                        document.data?.slides?.map((slide, index) => {
                            console.log(slide)
                            return (
                                <section key={index} data-transition="slide">
                                    git a
                                </section>
                            )
                        })
                    }
                    {/*<section data-transition="slide" data-background-color="aquamarine">*/}
                    {/*    <h1>🍦</h1>*/}
                    {/*</section>*/}
                    {/*<section data-transition="slide" data-background-color="#283b95">*/}
                    {/*    <h1>🍰🍰🍰</h1>*/}
                    {/*</section>*/}
                    {/*<section data-transition="slide">*/}
                    {/*    miam*/}
                    {/*</section>*/}
                </div>
            </div>
        </Grid>

    );
}