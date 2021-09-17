
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Produto from './pages/produtos';
import Error from './pages/error';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Produto} />
                <Route path="*" component={Error} />
            </Switch>
        </BrowserRouter>
    )
}