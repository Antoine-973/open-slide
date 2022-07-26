import {Slide} from "./Components/Pages/Slide/Slide";
import {DocumentList} from "./Components/Pages/DocumentList/DocumentList";
import {Login} from "./Components/Pages/login/Login" ;
import {AuthProvider} from "./Components/Provider/AuthProvider";
import {Presentation} from "./Components/Pages/Slide/Presentation";


export const App = () => {

    return (
        <div className="App">
            <AuthProvider >
                <Routes>
                    <Route  path="slide" element={<Slide/>}/>
                    <Route  path="/" element={<DocumentList/>}/>
                    <Route path="login"  element={<Login/>}/>
                    <Presentation />
                </Routes>
            </AuthProvider>
        </div>

    );
}