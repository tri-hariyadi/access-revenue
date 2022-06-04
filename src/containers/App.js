import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loading = () => (
  <div
    className="animated fadeIn pt-3 text-center d-flex align-items-center justify-content-center flex-column"
    style={{ width: '100vw', height: '100vh', backgroundColor: 'whitesmoke' }}>
    <div>
      <Spinner type="grow" color="primary" style={{ width: '3rem', height: '3rem', margin: '0 4px' }} />
      <Spinner type="grow" color="warning" style={{ width: '3rem', height: '3rem', margin: '0 4px' }} />
      <Spinner type="grow" color="danger" style={{ width: '3rem', height: '3rem', margin: '0 4px' }} />
    </div>
    <div className='mt-3'>
      <h4 style={{ fontFamily: 'FSAlbertBold' }}>Please Wait...</h4>
    </div>
  </div>
)

// Containers
const Home = React.lazy(() => import('./Home'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));

// Pages
// const Login = React.lazy(() => import('./views/Pages/Login'));
// const Register = React.lazy(() => import('./views/Pages/Register'));
// const Page404 = React.lazy(() => import('./views/Pages/Page404'));
// const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} /> */}
              <Route exact path="/login" name="LoginPage" render={props => <LoginPage {...props} />} />
              <Route path="/" name="Home" render={props => <Home {...props} />} />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
        <ToastContainer
          theme='dark'
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
