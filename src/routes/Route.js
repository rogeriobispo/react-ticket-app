import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { authContext } from '../context/auth';

export default function RouteWraper(
  { component: Component, 
    isPrivate,
    ...rest 
  }) {
  const { signed, loading } = useContext(authContext);
    
    if(loading) {
      return <div>Loading</div>
    }

    if(!signed && isPrivate) {
      return(<Redirect to='/' />)
    }

    if(signed && !isPrivate) {
      return (<Redirect to='/dashboard' />)
    }


    return(
      <Route
        {...rest}
        render={props => (<Component { ...props } />
      )}
      />
    )
}