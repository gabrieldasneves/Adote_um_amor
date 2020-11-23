import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Landing from "./pages/Landing";
import PetsMap from "./pages/PetsMap";
import Pet from "./pages/Pet";

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={PetsMap} />
                <Route path="/pets/:id" component={Pet} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;