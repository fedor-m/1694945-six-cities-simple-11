import { AuthorizationStatus } from '../../const';
import { Review } from '../../types/review';
import { OfferId } from '../../types/offer';
import { calculateRatingWidth, formatDate } from '../../utils';
import ReviewForm from './review/review-form';

type PropertyReviewsProps = {
  authorizationStatus: AuthorizationStatus;
  reviews: Review[] | null;
  selectedOffer: OfferId;
};

function PropertyReviews({
  authorizationStatus,
  reviews,
  selectedOffer
}: PropertyReviewsProps): JSX.Element {
  return (
    <section className="property__reviews reviews">
      {reviews && reviews.length > 0 &&
        <>
          <h2 className="reviews__title">
            Reviews · <span className="reviews__amount">{reviews.length}</span>
          </h2>
          <ul className="reviews__list">
            {reviews.map((review) => (
              <li key={review.id} className="reviews__item">
                <div className="reviews__user user">
                  <div className="reviews__avatar-wrapper user__avatar-wrapper">
                    <img
                      className="reviews__avatar user__avatar"
                      src={review.user.avatarUrl}
                      width="54"
                      height="54"
                      alt="Reviews avatar"
                    />
                  </div>
                  <span className="reviews__user-name">{review.user.name}</span>
                </div>
                <div className="reviews__info">
                  <div className="reviews__rating rating">
                    <div className="reviews__stars rating__stars">
                      <span style={{ width: calculateRatingWidth(review.rating) }} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <p className="reviews__text">{review.comment}</p>
                  <time
                    className="reviews__time"
                    dateTime={review.date}
                  >
                    {formatDate(review.date)}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </>}
      {
        authorizationStatus === AuthorizationStatus.Auth
        &&
        <ReviewForm selectedOffer={selectedOffer} />
      }
    </section>
  );
}
export default PropertyReviews;
