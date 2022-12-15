import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeUserData } from '../../mocks/mocks';
import { AppRoute, AuthorizationStatus } from '../../const';
import Header from './header';
import Nav from '../nav/nav';

const history = createMemoryHistory();
const fakeUserData = makeFakeUserData();
const fakeState = {
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData
  }
};
const mockStore = configureMockStore();

describe('Component: Header', () => {
  it('should render correctly without user navigation', () => {
    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should render correctly with user navigation and status authorized', () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Header>
              <Nav />
            </Header>
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();

    const avatarElement = screen.getByAltText(`${fakeState.USER.userData.name}`);
    expect(avatarElement).toBeInTheDocument();

    const spanElement = screen.getByText(/Sign out/i);
    expect(spanElement).toBeInTheDocument();
  });

  it('should render correctly with user navigation and status unauthorized', () => {
    const store = mockStore({
      ...fakeState,
      USER: {
        ...fakeState.USER.userData,
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Header>
              <Nav />
            </Header>
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    const spanElement = screen.getByText(/Sign in/i);
    expect(spanElement).toBeInTheDocument();
  });

  it('should redirect to "main-page" if user click to the link with logo', async () => {
    const store = mockStore(fakeState);
    history.push('/header');

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Routes>
              <Route
                path='/header'
                element={
                  <Header>
                    <Nav></Nav>
                  </Header>
                }
              />
              <Route
                path={AppRoute.Main}
                element={<h1>Main page.</h1>}
              />
            </Routes>
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('logo'));
    expect(screen.getByText(/Main page./i)).toBeInTheDocument();
  });
});
