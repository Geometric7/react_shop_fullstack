import React from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

import { Provider } from 'react-redux';

import { createTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { NotFound } from './components/views/NotFound/NotFound';
import { Ring } from './components/views/Ring/Ring';
import { Products } from './components/views/Products/Products';
import { OrderSummary } from './components/views/OrderSummary/OrderSummary';
import { Creations } from './components/views/Creations/Creations';

const theme = createTheme({
  palette: {
    primary: { main: '#4D43DA' },
  },
});

const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Wrapper>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout>
              <Switch>
                <Route exact path='/' component={ Homepage } />
                <Route exact path='/products/:id' component={ Products } />
                <Route exact path='/ring/:id' component={ Ring } />
                <Route exact path='/order' component={ OrderSummary } />
                <Route exact path='/creations' component={ Creations } />
                <Route path='*' component={ NotFound } />
              </Switch>
            </MainLayout>
          </ThemeProvider>
        </StylesProvider>
      </Wrapper>
    </BrowserRouter>
  </Provider>
);

export { App };
