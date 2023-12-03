import { Route, Routes } from 'react-router-dom';

import { Page404 } from './components/Page404/Page404';

import { Provider } from 'react-redux';
import store from './store';
import Main from './pages/Main';
import UncontrolledForm from './pages/UncontrolledForm';
import ReactHookForm from './pages/ReactHookForm';
import Header from './components/Header';

export const ErrorEl = () => {
  return (
    <section>
      <div className="container column">
        <h1 className="error_message">Somethig went wrong</h1>
        <button
          className="button"
          onClick={() => {
            location.reload();
          }}
        >
          Please, refresh page!
        </button>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="*" element={<Page404 />}></Route>
          <Route
            path={'/'}
            element={<Main />}
            errorElement={<ErrorEl />}
          ></Route>
          <Route path={'/uncontrolled-form'} element={<UncontrolledForm />} />
          <Route path={'/controlled-form'} element={<ReactHookForm />} />
        </Routes>
      </Provider>
    </>
  );
}
