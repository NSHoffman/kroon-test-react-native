import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  overlayContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 350,
    height: 350,
  },
});
