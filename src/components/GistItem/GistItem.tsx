import React, { memo } from 'react';
import { Image, View, Text } from 'react-native';

import styles from './GistItem.styles';

type GistItemProps = {
  id: string;
  avatarUrl: string;
  filename: string;
};

const GistItem: React.FC<GistItemProps> = ({ avatarUrl, filename }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: avatarUrl,
            cache: 'force-cache',
          }}
          resizeMethod="resize"
          style={styles.avatar}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.filename}>
          {filename}
        </Text>
      </View>
    </View>
  );
};

export const GistItemMemoized = memo(GistItem);
GistItemMemoized.displayName = 'GistItem';

export const ITEM_HEIGHT =
  styles.avatarContainer.height + styles.container.borderBottomWidth;
