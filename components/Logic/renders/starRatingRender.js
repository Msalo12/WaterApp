import React from 'react';
import { View } from 'react-native';
import { COLOR, ICONS } from '../../../constants';


const StarRating = ({ rating }) => {
  const yellowStars = Math.floor(rating); // Number of yellow stars
  const greyStars = 5 - yellowStars; // Remaining stars will be grey

  const renderStars = (count, type) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <View key={`${type}_${i}`} style={{ marginRight: 5 }}>
          {type === 'yellow' ? <ICONS.star /> : <ICONS.grey_star />}
        </View>
      );
    }
    return stars;
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {renderStars(yellowStars, 'yellow')}
      {renderStars(greyStars, 'grey')}
    </View>
  );
};

export default StarRating;
