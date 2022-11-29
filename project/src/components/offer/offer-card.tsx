import { Offer } from '../../types/offer';
import CardPremiumMark from './card/card-premium-mark';
import CardPreview from './card/card-preview';
import CardPrice from './card/card-price';
import CardRating from './card/card-rating';
import CardName from './card/card-name';
import CardType from './card/card-type';

type CardProps = {
  offer: Offer;
  mouseOverHandler: () => void;
  mouseOutHandler: () => void;
};

function OfferCard({
  offer,
  mouseOverHandler,
  mouseOutHandler
}: CardProps): JSX.Element {
  const {
    id,
    previewImage,
    price,
    title,
    type,
    rating,
    isPremium
  } = offer;
  const link = `/offer/${id}`;
  return (
    <article
      className="cities__card place-card"
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
    >
      {isPremium && <CardPremiumMark />}
      <CardPreview
        link={link}
        previewImage={previewImage}
        title={title}
      />
      <div className="place-card__info">
        <CardPrice price={price} />
        <CardRating rating={rating} />
        <CardName
          link={link}
          title={title}
        />
        <CardType type={type} />
      </div>
    </article>
  );
}
export default OfferCard;
