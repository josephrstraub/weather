import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { GooglePlacesLocation } from '../../definitions';

interface Props {
  locations: GooglePlacesLocation[];
  onLocationSelect: Function;
}

const Locations: FC<Props> = ({ locations, onLocationSelect }) => (
  <FlatList
    data={locations}
    ItemSeparatorComponent={() => (
      <View style={{ backgroundColor: 'gray', height: StyleSheet.hairlineWidth, marginHorizontal: 10 }} />
    )}
    renderItem={({ item, separators }) => (
      <TouchableHighlight
        key={item.place_id}
        onPress={() => onLocationSelect(item.place_id)}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
      >
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', height: 40, paddingHorizontal: 10 }}>
          <Text style={{ lineHeight: 40 }}>{item.description}</Text>
        </View>
      </TouchableHighlight>
    )}
  />
);

export default Locations;
