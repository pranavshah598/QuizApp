import React from "react"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Text } from "react-native-elements"
import LinearGradient from "react-native-linear-gradient"
import { negativeColor } from "../../model/Quiz"
interface CategoryScreenProps {
    navigation: any
}
export const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation }) => {
    const categoryTile = (title: string, screenName: string) => {
        return (<TouchableWithoutFeedback onPress={() => {
            navigation.navigate(screenName);
        }}>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
                <LinearGradient colors={negativeColor} style={styles.linearGradient}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>)
    }
    return (<View style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 20, flex: 1, justifyContent: 'flex-start' }}>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                {categoryTile('Location', 'Quiz')}
                {categoryTile('Cloth', 'Quiz')}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                {categoryTile('Toys', 'Quiz')}
                {categoryTile('Vehicle', 'Quiz')}

            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                {categoryTile('Animal', 'Quiz')}
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                </View>
            </View>
            {/* <View style={{ flexDirection: 'row', flex: 1, marginTop: 40 }}>
                {categoryTile('Nature', 'Quiz')}
                {categoryTile('Cloth', 'Quiz')}
            </View> */}
        </View>
    </View >)
}


const styles = StyleSheet.create({
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
});