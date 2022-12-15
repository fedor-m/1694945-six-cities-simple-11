import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeOffer } from '../../mocks/mocks';
import PropertyHost from './property-host';


const history = createMemoryHistory();

describe('Component: PropertyHost', () => {
  const offer = makeFakeOffer();
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <PropertyHost
            host={offer.host}
            description={offer.description}
          />
        </HelmetProvider>
      </HistoryRouter>
    );
    expect(screen.getByTestId('property-host')).toBeInTheDocument();
  });
  it('should render with Pro mark correctly', () => {
    const offer = makeFakeOffer();
    offer.host.isPro = true;
    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <PropertyHost
            host={offer.host}
            description={offer.description}
          />
        </HelmetProvider>
      </HistoryRouter>
    );
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });
});
