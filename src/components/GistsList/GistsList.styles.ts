import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  loaderContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContainer: {
    height: Dimensions.get('window').height,
  },

  listEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },

  listEmptyText: {
    fontSize: 14,
    color: '#939393',
  },

  listHeader: {
    flex: 1,
    backgroundColor: '#E3E3E3',
    paddingVertical: 4,
    paddingHorizontal: 16,
  },

  listHeaderText: {
    fontSize: 16,
    fontWeight: '800',
  },

  listFooter: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
