import {Slide} from "./Components/Pages/Slide/Slide";
import {DocumentList} from "./Components/Pages/DocumentList/DocumentList";
import {Login} from "./Components/Pages/login/Login" ;
import {AuthProvider} from "./Components/Provider/AuthProvider";
import {Presentation} from "./Components/Pages/Slide/Presentation";
import {Route, Routes} from "react-router-dom";

export const App = () => {

    return (
        <div className="App">
            <AuthProvider >
                <Routes>
                    <Route  path="/" element={<DocumentList/>}/>
                    <Route path="login"  element={<Login/>}/>
                    <Route path="slide/:id" element={<Slide />} />
                    <Route path="slide/:id/presentation" element={<Presentation />}/>
                    <Route path="/" element={<DocumentList/>}/>
                </Routes>
            </AuthProvider>
        </div>

    );
}