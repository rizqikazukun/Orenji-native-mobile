/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text} from 'react-native';

export default function UserComment({key, comment}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 20,
        marginTop: 12,
        q: 'center',
      }}>
      <Image
        style={{height: 50, width: 50, borderRadius: 50}}
        src={`${comment.photo}`}
      />
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          gap: 2,
          paddingRight: 80,
        }}>
        <Text
          style={{
            fontFamily: 'Lato-Bold',
            color: 'black',
            fontSize: 16,
          }}>
          {comment.name}
        </Text>
        <Text>{comment.message}</Text>
      </View>
    </View>
  );
}
