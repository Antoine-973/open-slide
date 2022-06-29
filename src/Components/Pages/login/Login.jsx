import $ from 'react'
import login from '../../../firebase/firebase' ;
import GoogleIcon from '@mui/icons-material/Google';
import {Button, Card, CardContent, IconButton, Typography} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

let user = {} ;

const setLogin = (loggedUser) => {
    user = loggedUser ;
    console.log(user) ;
}

export const Login = () => {
    return(
        <>
            <CssBaseline>
                <Container maxWidth="sm">
                    <div>
                        <Button aria-label="Google sign-in" size="large" onClick={(evt)=> login(setLogin)}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        <GoogleIcon sx={{fontSize: 56}}/>
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Sign-in with Google
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Button>
                    </div>
                </Container>
            </CssBaseline>
        </>
    )
}