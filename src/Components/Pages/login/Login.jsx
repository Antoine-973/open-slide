import react, {useContext} from 'react'
import {signInWithGoogle} from '../../../firebase/firebase';
import GoogleIcon from '@mui/icons-material/Google';
import {Button, Card, CardContent, IconButton, Typography} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../Provider/AuthProvider";


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
        <>
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
        </>
    )
}


