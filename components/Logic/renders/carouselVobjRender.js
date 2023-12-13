import { View, Image } from 'react-native';
import { carouselStyle } from '../../../styles/style';
import * as RNFS from 'react-native-fs'


export const carouselRender = data => (
    <View
        key={data.uri}
        style={carouselStyle.cardContainer}
    >
        <View
            style={carouselStyle.cardWrapper}
        >
            <Image
                style={carouselStyle.card}
                source={{uri: data.uri}}
            />
        </View>
    </View>
);