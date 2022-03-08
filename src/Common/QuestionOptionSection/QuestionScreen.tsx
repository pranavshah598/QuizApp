import React from 'react';
import { View } from 'react-native';
import { Option } from '../Option/Option';
import { Question } from '../Question/Question';
import { QuestionState } from '../../model/Quiz';

export interface QuestionDetail {
    title: string;
    guessTitle: string;
}

export interface OptionDetail {
    display: string;
    val: number;
}

interface QuestionScreenProps {
    questionDetail: QuestionDetail;
    options: OptionDetail[];
    optionClick: (value: OptionDetail) => void,
    questionState: QuestionState,
    selOption?: OptionDetail
}

export const QuestionOptionSection: React.FC<QuestionScreenProps> = ({ selOption, questionState, questionDetail, options, optionClick }) => {
    const IsActionPending = [QuestionState.Normal, QuestionState.SelOption].includes(questionState)

    return (<View>
        <View style={{ flexDirection: 'row' }}>
            <Question questionDetail={questionDetail} selOption={selOption} questionState={questionState} />
        </View>
        <View style={{ marginHorizontal: 30, marginTop: 30 }}>
            <View style={{ flexDirection: 'row', marginTop: 20, flexWrap: 'wrap', justifyContent: 'center', opacity: IsActionPending ? 1 : 0.3 }} pointerEvents={IsActionPending ? "auto" : "none"}>
                {options.map(s => (
                    <Option
                        optionDetail={s}
                        optionClick={(val) => {
                            optionClick(val);
                        }}
                        textStyle={{ opacity: selOption?.val === s.val ? 0 : 1 }} />
                ))}
            </View>
        </View>
    </View>)

}