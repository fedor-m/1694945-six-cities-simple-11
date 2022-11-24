import { FormatDate, Rating, REVIEWS_LIST_LENGTH } from './const';
import { offers } from './mocks/offers';
import { City } from './types/city';
import { Offer } from './types/offer';
import { Review } from './types/review';

export const getPluralWord = (number: number, word: string): string =>
  `${word}${number > 1 ? 's' : ''}`;

export const formatDate = (date: string, locales = FormatDate.Locale): string =>
  new Date(date).toLocaleString(locales, {
    month: FormatDate.Month,
    year: FormatDate.Year,
  });

export const getOffersByCity = (city: City): Offer[] =>
  offers.filter((offer)=>offer.city.name === city.name);

export const calculateRatingWidth = (rating: number): string =>
  rating <= Rating.Max ? `${rating * Rating.MultiplyValue}%` : '0%';

export const getSortedReviews = (reviews: Review[]): Review[] => {
  const sortedReviews = reviews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return sortedReviews.slice(0, REVIEWS_LIST_LENGTH);
};
