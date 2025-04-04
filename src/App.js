import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import SkipHire from "./pages/SkipHire";

function App() {


    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <header className="App-header"></header>
                <main className="App-main">
                    <SkipHire/>
                </main>
            </div>
        </ThemeProvider>
    );
}

export default App;
