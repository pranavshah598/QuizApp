import { OptionDetail, QuestionDetail } from "../Common/QuestionOptionSection/QuestionScreen";

export enum QuestionState {
    Normal = "Normal",
    SelOption = "SelOption",
    Success = "Success",
    Fail = "Fail"
}

interface QuestionStateInformation {
    containerColor: string[],
    buttonColor: string,
    buttonTxtColor: string
}


export interface QuestionInfo {
    questionDetail: QuestionDetail;
    options: OptionDetail[];
    answer: string;
    categoryId: string;
}


export interface Category {
    name: string;
    id: number;
}

export const negativeColor = ['#ff7787', '#ff8189', '#ff8c8b', '#ff918c'];
export const positiveColor = ['#00dee9', '#12e3e8', '#31e7ea', '#3de9e9'];
export const QuizStateInformation: { [state: string]: QuestionStateInformation } = {
    [QuestionState.Normal]: { containerColor: ['transparent'], buttonColor: '#6392a7', buttonTxtColor: 'white' },
    [QuestionState.SelOption]: { containerColor: ['transparent'], buttonColor: positiveColor[2], buttonTxtColor: 'white' },
    [QuestionState.Success]: { containerColor: positiveColor, buttonColor: 'white', buttonTxtColor: positiveColor[2] },
    [QuestionState.Fail]: { containerColor: negativeColor, buttonColor: 'white', buttonTxtColor: negativeColor[2] }
}

export const groupBy = (xs: any, key: string) => {
    return xs.reduce((rv: any, x: any) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};