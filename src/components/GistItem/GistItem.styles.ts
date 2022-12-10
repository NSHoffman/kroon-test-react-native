import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
  },

  avatarContainer: {
    width: 64,
    height: 64,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  avatar: {
    width: 48,
    height: 48,
  },

  infoContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },

  filename: {
    fontSize: 18,
  },
});
