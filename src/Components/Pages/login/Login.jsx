import  {useContext} from 'react'
import { signInWithGoogle} from '../../../firebase/firebase';
import GoogleIcon from '@mui/icons-material/Google';
import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../Provider/AuthProvider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Slideshow} from "@mui/icons-material";


export const Login =  () => {
    const { setAuthData, auth } = useContext(AuthContext);
    const navigate = useNavigate() ;
    const signIn = async () => {
        const user = await signInWithGoogle() ;
        if(user) {
            setAuthData(user) ;
            navigate('/') ;
        }
    }

    return(
        <Grid container direction={"column"} gap={6}>
            <Grid item>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Slideshow sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}  />
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
                            >
                                Open Slides
                            </Typography>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Grid>
            <Grid item>
                <CssBaseline>
                    <Container maxWidth="sm">
                        <div>
                            <Button aria-label="Google sign-in" size="large" onClick={() => signIn()}>
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
            </Grid>
        </Grid>
    )
}


