import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {CONTACTS, LOGIN, REGISTER} from "./api/routeConsts";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path={LOGIN} component={Login}/>
                    <Route path={REGISTER} component={Register}/>
                    <Route path={CONTACTS} component={Contacts}/>

                    <Redirect to={LOGIN}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
