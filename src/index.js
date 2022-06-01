import { ColorModeScript } from '@chakra-ui/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Favorite from './pages/Favorite';
import Home from './pages/Home';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import TvShows from './pages/TvShows';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Movies from './pages/Movies';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const persistor = persistStore(store);

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ColorModeScript />
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="" element={<Landing />} />
              <Route path="home" element={<Home />} />
              <Route path="favorite" element={<Favorite />} />
              <Route path="tv-shows" element={<TvShows />} />
              <Route path="movies" element={<Movies />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
