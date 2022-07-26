import {useContext, useEffect, useState} from 'react'
import {Button, Grid, IconButton, Paper, Typography} from "@mui/material";
import Navbar from "../../Libs/Navbar";
import {child, get, ref, remove, push, set} from "firebase/database";
import {db} from "../../../firebase/firebase";
import CloseIcon from '@mui/icons-material/Close';
import {AuthContext} from "../../Provider/AuthProvider";
import {useNavigate} from "react-router-dom";
import {AddBox} from "@mui/icons-material";

export const DocumentList = () => {

    const [loading, setLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [deletion, setDeletion] = useState(false);
    const { auth, setAuthData } = useContext(AuthContext);
    const navigate = useNavigate();

    const deleteDocument = (document) => {
        remove(ref(db,'/documents/'+document.id));
        if (deletion) {
            setDeletion(false);
        }else {
            setDeletion(true);
        }
    }

    const handleClick = () => {
        const postListRef = ref(db, 'documents');
        const newPostRef = push(postListRef);
        set(newPostRef,{
            title: "New document",
            slides: [
                {
                    content: "Test",
                    position: 1,
                },
            ],
        })
        .then(() => {
            console.log("Document created");
        })
        .catch(error => {
            console.log(error);
        });

        navigate(`/slide/${newPostRef.key}`);
    }

    const goToDocument = (document) => {
        navigate(`/slide/${document.id}`);
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
            <Grid item textAlign={"center"}>
                <Typography variant={"h4"}>Mes présentations</Typography>
            </Grid>
            <Grid item textAlign={"center"}>
                <Button size={"large"} variant={"contained"} onClick={handleClick} startIcon={<AddBox/>}>
                    Créer une présentation
                </Button>
            </Grid>
            <Grid item container justifyContent={"center"} gap={6}>
                {
                    documents.map((document, key) => {
                        return (
                            <Paper key={key} elevation={8} variant={"elevation"} sx={{position : "relative"}}>
                                <Grid style={{cursor : "pointer"}} onClick={() => goToDocument(document)} width={200} height={100} padding={4} textAlign={"center"} position={"relative"} display={"block"} >
                                    <Typography>{document.title}</Typography>
                                </Grid>
                                <Grid item position={"absolute"} top={0} right={0} margin={0}>
                                    <IconButton onClick={() => {
                                        deleteDocument(document);
                                    }}>
                                        <CloseIcon/>
                                    </IconButton>
                                </Grid>
                            </Paper>
                        )
                    })
                }
            </Grid>
        </Grid>
    )
}