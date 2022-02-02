import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile'
import Customer from '../pages/Customer';
import TicketNew from '../pages/TicketNew';

function Router() {
  return (
    <Switch>
       <Route exact path="/" component={SignIn} />
       <Route exact path="/register" component={SignUp} />
       <Route exact path="/dashboard" component={Dashboard} isPrivate/>
       <Route exact path="/profiles" component={Profile} isPrivate/>
       <Route exact path="/customers" component={Customer} isPrivate/>
       <Route exact path="/new-ticket" component={TicketNew} isPrivate/>
    </Switch>
  );
}

export default Router;
