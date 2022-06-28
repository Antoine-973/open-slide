import {h, render} from "preact";
import {useCallback} from "preact/hooks";

const App = () => {
    const onButtonClick = useCallback(() => alert("Hello, Preact"), []);
    return (
        <button onClick={onButtonClick}>
            Hello
        </button>
    );
};

const app = document.getElementById("app");

if (app) {
    render(<App />, app);
}