/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
} from 'react-native';
import * as Icons from 'react-native-feather';

export default function SearchItemHorizontalCard({
  image,
  title,
  buttonLike,
  buttonLink,
  description,
}) {
  return (
    <View
      style={{
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',

        borderRadius: 14,
        backgroundColor: 'white',
        marginVertical: 4,

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
      }}>
      <TouchableNativeFeedback onPress={buttonLink}>
        <View
          style={{
            flexShrink: 1,
            padding: 3,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: 'black',
              fontSize: 18,
            }}>
            {title}
          </Text>
          <Text style={{fontFamily: 'Lato-Regular'}}>
            {String(description).slice(0, 100)}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <ImageBackground
        imageStyle={{borderRadius: 8}}
        style={{
          width: 80,
          height: 80,
          padding: 5,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
        source={{uri: image}}>
        <TouchableOpacity onPress={buttonLike}>
          <Icons.Bookmark height={30} width={30} color={'white'} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
