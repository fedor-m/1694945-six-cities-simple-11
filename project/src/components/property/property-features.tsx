import { accomodationType } from '../../const';
import { getPluralWord } from '../../utils';
type PropertyFeaturesComponentProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
};
function PropertyFeatures({
  type,
  bedrooms,
  maxAdults,
}: PropertyFeaturesComponentProps): JSX.Element {
  return (
    <ul className="property__features">
      <li className="property__feature property__feature--entire">
        {accomodationType[type as keyof typeof accomodationType]}
      </li>
      <li className="property__feature property__feature--bedrooms">
        {`${bedrooms} ${getPluralWord(bedrooms, 'Bedroom')}`}
      </li>
      <li className="property__feature property__feature--adults">
        {`Max ${maxAdults} ${getPluralWord(maxAdults, 'adult')}`}
      </li>
    </ul>
  );
}
export default PropertyFeatures;
