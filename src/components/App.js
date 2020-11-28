import '../App.css';
import React from "react";
import Header from "./ui/Header.js";
import {ThemeProvider} from "@material-ui/styles";
import theme from "./ui/Theme.js";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Header/>
                <Switch>
                    <Route exact path="/" component={() => <div>Home</div>} />
                    <Route exact path="/services" component={() => <div>Services</div>} />

                    <Route exact path="/custom-software" component={() => <div>Custom Software Development</div>} />
                    <Route exact path="/mobile-apps" component={() => <div>Mobile Apps Development</div>} />
                    <Route exact path="/website" component={() => <div>Website Development</div>} />

                    <Route exact path="/revolution" component={() => <div>Revolution</div>} />
                    <Route exact path="/about" component={() => <div>About</div>} />
                    <Route exact path="/contact" component={() => <div>Contact</div>} />
                    <Route exact path="/estimate" component={() => <div>Estimate</div>} />


                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
