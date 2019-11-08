import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./configuration";
import MainTodo from "./components/Todo/MainTodo";
import Login from './components/Login';

const routing = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Router history={history}>
                <Route exact path="/" component={MainTodo} />
                {!localStorage.token ? <Route exact path="/login" component={Login} /> : <Route exact path="/login" component={MainTodo}/>}
            </Router>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();