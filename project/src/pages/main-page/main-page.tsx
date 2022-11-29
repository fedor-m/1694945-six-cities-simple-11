import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks/use-app-selector';
import { CITIES } from '../../const';
import { orderOffersByType, getOffersByCity } from '../../utils';
import HeaderSvg from '../../components/header/header-svg';
import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
import OffersSection from '../../components/offer/offers-section';

type MainPageProps = {
  isAuthorized: boolean;
};

function MainPage({ isAuthorized }: MainPageProps): JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);
  const allOffers = useAppSelector((state) => state.offers);
  const activeSort = useAppSelector((state) => state.activeSort);
  const offers = orderOffersByType(
    getOffersByCity(
      allOffers,
      activeCity.name
    ),
    activeSort
  );
  const mainClassName =
    offers.length > 0
      ? 'page page--gray page--main'
      : 'page__main page__main--index page__main--index-empty';
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Main Page</title>
      </Helmet>
      {offers.length > 0 && <HeaderSvg />}
      <Header isAuthorized={isAuthorized} />
      <main className={mainClassName}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Cities cities={CITIES} />
        </div>
        <div className="cities">
          <OffersSection
            activeCity={activeCity}
            offers={offers}
          />
        </div>
      </main>
    </div>
  );
}
export default MainPage;
