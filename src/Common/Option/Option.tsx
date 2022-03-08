import React from 'react';
import { StyleProp, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { OptionDetail } from '../QuestionOptionSection/QuestionScreen';


interface OptionProps {
    optionDetail: OptionDetail,
    optionClick?: (value: OptionDetail) => void,
    containerStyle?: ViewStyle,
    textStyle?: TextStyle
}

export const Option: React.FC<OptionProps> = ({ optionClick, optionDetail, containerStyle, optionDetail: { display, val }, textStyle }) => {

    return (
        <TouchableWithoutFeedback onPress={() => optionClick && optionClick(optionDetail)}>
            <View style={{ backgroundColor: 'white', marginHorizontal: 7, paddingVertical: 18, paddingHorizontal: 25, borderRadius: 20, marginTop: 10, ...containerStyle }}>
                <Text style={{ color: '#3c6c82', fontWeight: 'bold', ...textStyle }}>{display}</Text>
            </View>
        </TouchableWithoutFeedback>)

}