import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import questionList from '../../data/questionList.json';
import categoryList from '../../data/categorylist.json';
import { OptionDetail, QuestionDetail, QuestionOptionSection } from '../../Common/QuestionOptionSection/QuestionScreen';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Category, groupBy, QuestionInfo, QuestionState, QuizStateInformation } from '../../model/Quiz';
import firestore from '@react-native-firebase/firestore';

interface QuestionData {
    data: QuestionInfo[]
}

interface CategoryData {
    data: Category[]
}


export const QuizScreen: React.FC<{}> = () => {
    const [questionState, setQuestionState] = useState<QuestionState>(QuestionState.Normal)
    const [selOption, setSelOption] = useState<OptionDetail>();
    const [questions, setQuestions] = useState<QuestionInfo[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selQuestionIndex, setSelQuestionIndex] = useState<number>(0);
    const [selCategoryId, setSelCategoryId] = useState<number>(1);
    //const questions = questionList.filter(s => s.categoryId === selCategoryId)


    useEffect(() => {
        const getQuestionList = async () => {
            const categoryCollection = await firestore().collection('Category');
            const questionCollection = await firestore().collection('QuestionDetail');
            const categories = (await categoryCollection.get()).docs[0].data() as CategoryData;
            setCategories(categories.data);
            const questionData = (await questionCollection.doc(selCategoryId.toString()).get()).data() as QuestionData;
            setQuestions(questionData.data);
        }
        getQuestionList();
    }, [])

    const optionClick = (val: OptionDetail) => {
        setSelOption(val);
        setQuestionState(QuestionState.SelOption);
    }
    const isActionPending = [QuestionState.Normal, QuestionState.SelOption].includes(questionState)
    const continueHandler = () => {
        if (isActionPending) {
            if (selOption) {
                if (selOption.val.toString() == questions[selQuestionIndex].answer) {
                    setQuestionState(QuestionState.Success)
                }
                else {
                    setQuestionState(QuestionState.Fail)
                }
            }
        }
        else {
            if (selQuestionIndex === questions.length - 1) {
                selCategoryId === categoryList.length ? setSelCategoryId(1) : setSelCategoryId(selCategoryId + 1);
                setSelQuestionIndex(0);
            }
            else {
                setSelQuestionIndex(selQuestionIndex + 1);
            }

            setQuestionState(QuestionState.Normal);
            setSelOption(undefined);
        }
    }

    if (questions.length === 0 || categories.length === 0) {
        return null;
    }

    const { containerColor, buttonColor, buttonTxtColor } = QuizStateInformation[questionState];
    const { questionDetail, options, answer } = questions[selQuestionIndex];
    return (
        <SafeAreaView style={{ backgroundColor: 'transparent', flex: 1 }}>
            <View style={styles.queMainContainer}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, flex: 1, alignSelf: 'center' }}>{`Category : ${categories.find(s => s.id === selCategoryId)?.name}`}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{`${selQuestionIndex} / ${questions.length}`}</Text>
                    </View>
                </View>
                <View style={styles.questionContainer}>
                    <View style={{ flex: 1 }}>
                        <QuestionOptionSection questionDetail={questionDetail}
                            options={options}
                            optionClick={optionClick}
                            questionState={questionState}
                            selOption={selOption} />
                    </View>
                    <LinearGradient colors={containerColor} style={styles.linearGradient}>
                        <View style={styles.bottomContainer}>
                            {[QuestionState.Success, QuestionState.Fail].includes(questionState) && <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={styles.completionTxt}>{questionState === QuestionState.Fail ? 'Answer:' : 'Great Job!'}</Text>
                                    {questionState === QuestionState.Fail && <Text style={{ ...styles.completionTxt, marginLeft: 10 }}>{options.find(s => s.val.toString() == answer)?.display}</Text>}
                                </View>
                                <Icon name='flag' type='ionicon' size={24} iconStyle={{ color: 'white' }} />
                            </View>}
                            <Button
                                title={questionState === QuestionState.SelOption ? 'CHECK ANSWER' : 'Continue'}
                                titleStyle={{ color: buttonTxtColor, ...styles.btnTitleStyle }}
                                onPress={continueHandler}
                                buttonStyle={{ backgroundColor: buttonColor, ...styles.btnStyle }}></Button>
                        </View>
                    </LinearGradient>


                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    btnTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnStyle: {
        borderRadius: 30,
        height: 50,
        marginTop: 15
    },
    completionTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    bottomContainer: {
        paddingBottom: 50,
        paddingTop: 30
    },
    questionContainer: {
        flex: 9,
        backgroundColor: '#3c6c82',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 50
    },
    queMainContainer: {
        flex: 1,
        backgroundColor: '#76dafe'
    }
});