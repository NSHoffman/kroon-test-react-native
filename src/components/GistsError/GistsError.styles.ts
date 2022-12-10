import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 20,
    backgroundColor: '#FF4646',
  },

  messageContainer: {},

  message: {
    fontSize: 14,
    color: '#FFF',
  },

  buttonContainer: {
    paddingLeft: 16,
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    paddingBottom: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
