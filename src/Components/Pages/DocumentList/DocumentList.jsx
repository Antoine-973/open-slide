import {useContext, useEffect, useState} from 'react'
import {Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Navbar from "../../Libs/Navbar";
import {child, get, ref, remove} from "firebase/database";
import {db} from "../../../firebase/firebase";
import CloseIcon from '@mui/icons-material/Close';

export const DocumentList = () => {

    const [loading, setLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [deletion, setDeletion] = useState(false);

    const deleteDocument = (document) => {
        remove(ref(db,'/documents/'+document.id));
        if (deletion) {
            setDeletion(false);
        }else {
            setDeletion(true);
        }
    }

    useEffect(() => {
        get(child(ref(db),'/documents')).then(snapshot => {
            if (snapshot.exists()) {
                const docs = [];
                Object.entries(snapshot.val()).forEach(([key, value]) => {
                    docs.push({id: key, ...value})
                })
                setDocuments(docs);
            } else {
                console.log('no data');
            }
        }).finally(() => {
            setLoading(false);
        });
    }, [deletion]);

    return (
        !loading &&
        <Grid container direction={"column"} gap={6}>
            <Grid item>
                <Navbar/>
            </Grid>
            <Grid item>
                <Button size={"large"} variant={"contained"} startIcon={<AddBoxIcon/>}>
                    Créer une présentation
                </Button>
            </Grid>
            <Typography variant={"h6"}>Mes présentations</Typography>

            <Grid container justifyContent={"center"} gap={6}>
                {
                    documents.map((document,key) => {
                        return (
                            <Paper key={key} elevation={8} variant={"elevation"} >
                                <Grid width={200} height={100} padding={4} textAlign={"center"} position={"relative"} display={"block"} >
                                        <Grid item position={"absolute"} top={0} right={0} margin={0}>
                                            <IconButton onClick={() => {
                                                deleteDocument(document);
                                            }}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </Grid>
                                    <Typography>{document.title}</Typography>
                                </Grid>
                            </Paper>
                        )
                    })
                }
            </Grid>
        </Grid>
    )
}