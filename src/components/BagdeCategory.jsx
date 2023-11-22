import React from 'react'
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	ImageBackground,
	Image
} from 'react-native';

export default function BagdeCategory({title, imageSource}) {
  return (
	<View style={{display: 'flex', flexDirection: 'column'}}>
		<View style={{height: 60, width: 60}}>
			<Image style={{height: '100%', width: '100%', borderRadius: 8}} source={imageSource} />
		</View>
		<Text style={{textAlign: 'center'}}>{title}</Text>
	</View>
  )
}
