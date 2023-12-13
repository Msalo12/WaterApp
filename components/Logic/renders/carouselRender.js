import { View, Image } from 'react-native';
import { carouselStyle } from '../../../styles/style';
import * as RNFS from 'react-native-fs'


export const caroselRender = data => (
    <View
        key={data.coverImageUri}
        style={carouselStyle.cardContainer}
    >
        <View
            style={carouselStyle.cardWrapper}
        >
            <Image
                style={carouselStyle.card}
                source={data.coverImageUri}
            />
        </View>
    </View>
);