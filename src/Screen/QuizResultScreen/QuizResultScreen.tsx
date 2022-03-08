import React from 'react';
import { View } from 'react-native';
import { Question } from '../../Common/Question/Question';

interface QuestionDetail {
    title: string;
    guessTitle: string;
}

interface QuestionResultScreen {
    question: QuestionDetail;
    options: string[];
}

export const QuestionResultScreen: React.FC<QuestionResultScreen> = ({ question, options }) => {

    return (<View>
        <Question questionDetail={question} />
    </View>)

}