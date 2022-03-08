import React from 'react';
import { StyleProp, Text, View, ViewProps, ViewStyle } from 'react-native';
import { QuestionState, QuizStateInformation } from '../../model/Quiz';
import { OptionDetail, QuestionDetail } from '../QuestionOptionSection/QuestionScreen';
import { Option } from '../Option/Option';


interface QuestionProps {
    questionDetail: QuestionDetail,
    selOption?: OptionDetail,
    questionState: QuestionState
}

export const Question: React.FC<QuestionProps> = ({ selOption, questionDetail: { title, guessTitle }, questionState }) => {

    const titleSeparation = title.split('<bu>');
    const guessTitleSeparation = guessTitle.split('<s>')
    return (<View style={{ flex: 1 }}>
        <View style={style.container}>
            {titleSeparation.map((s, ind) => (<Text style={{ ...style.txt, fontWeight: ind === 1 ? 'bold' : 'normal', textDecorationLine: ind === 1 ? 'underline' : 'none' }}>{s}</Text>))}
        </View>
        <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'flex-end', alignSelf: 'center', height: 70 }}>
            {guessTitleSeparation.map((s, ind) => ind === 0 ? (
                <>
                    <Text style={style.txt}>{s}</Text>
                    {selOption ? <Option
                        optionDetail={selOption}
                        containerStyle={{ backgroundColor: QuizStateInformation[questionState].buttonTxtColor }}
                        textStyle={{ color: [QuestionState.Normal, QuestionState.SelOption].includes(questionState) ? '#3c6c82' : QuizStateInformation[questionState].buttonColor }} /> : < Text style={{ ...style.txt, marginHorizontal: 10 }}>________</Text>}
                </>
            ) : (<Text style={style.txt}>{s}</Text>))}
        </View>
        {/* <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginTop: 60 }}>{guessTitle}</Text> */}
    </View >)

}

const style = {
    container: {
        flexDirection: 'row',
        alignSelf: 'center'
    } as ViewStyle,
    txt: {
        color: 'white',
        fontSize: 22
    }
}