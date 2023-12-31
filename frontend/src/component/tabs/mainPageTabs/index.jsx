import * as S from './style';
import { useState } from 'react';
import Card from 'component/newscards/card';
import Quizzes from 'pages/mainPage/Quizzes';
import { useEffect } from 'react';
import { TryGetQuiz } from 'APIs/QuizAPIs';
import { useSelector } from 'react-redux';
import { TryGetArticles } from 'APIs/ArticleAPIs';
import { useNavigate } from 'react-router-dom';

const MainPageTabs = ({ selectedKeyword, data }) => {
    const accessToken = useSelector(state => state.user.accessToken);
    const navigate = useNavigate();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [selectedKeywordId, setSelectedKeywordId] = useState(0);
    const [selectedSummary, setSelectedSummary] = useState('요약 준비중입니다...');
    const [quizData, setQuizData] = useState({})
    const [articleData, setArticleData] = useState([])
    const [isQuizStarted, setIsQuizStarted] = useState(false);

    const handleTabSelect = (index) => {
        setActiveTabIndex(index);
    };

    const handleStartQuiz = () => {
        if (!accessToken) {
            navigate('/login');
        } else {
            setIsQuizStarted(true);
        }
    };

    useEffect(() => {
        setIsQuizStarted(false);
    }, [selectedKeyword]);

    useEffect(() => {
        if (data && data.quizList) {
            const selectedData = data.quizList.find(quiz => quiz.name === selectedKeyword);
            if (selectedData) {
                setSelectedKeywordId(selectedData.keyWordId)
                setSelectedSummary(selectedData.summary)
            }
        }
    }, [selectedKeyword, data]);

    // 키워드 선택시 관련기사와 퀴즈 불러오기
    useEffect(() => {
        if (selectedKeywordId) {
            (async () => {
                try {
                    const articlePromise = TryGetArticles(selectedKeywordId);
                    const quizPromise = TryGetQuiz(accessToken, selectedKeywordId);

                    const [articleData, quizData] = await Promise.all([articlePromise, quizPromise]);

                    setArticleData(articleData.quizList);
                    setQuizData(quizData.quizList);

                } catch (error) {
                    console.error(error);
                }
            })()
        }
    }, [selectedKeywordId]);

    return (
        <S.CustomTabs onSelect={handleTabSelect} selectedIndex={activeTabIndex}>
            <S.CustomTabList>
                <S.CustomTab>뉴스 요약</S.CustomTab>
                <S.CustomTab>관련 뉴스</S.CustomTab>
                <S.CustomTab>문제 풀기</S.CustomTab>
            </S.CustomTabList>

            <S.CustomTabPanel>
                <S.QuizSection>
                    {selectedSummary ? <p>{selectedSummary}</p> : <p>요약 준비중입니다...</p>}
                </S.QuizSection>
            </S.CustomTabPanel>
            <S.CustomTabPanel>
                {articleData?.length > 0 ? (
                    <S.CardList>
                        {articleData.map((quiz, index) => (
                            <S.CardItem key={index}>
                                <Card
                                    quiz={quiz}
                                    title={quiz.title}
                                    img_src={quiz.thumbnail}
                                    url={quiz.link}
                                />
                            </S.CardItem>
                        ))}
                    </S.CardList>
                ) : (
                    <S.QuizSection>
                        <p>기사 준비중입니다...</p>
                    </S.QuizSection>
                )}
            </S.CustomTabPanel>

            <S.CustomTabPanel>
                {isQuizStarted ? (
                    <S.QuizSection>
                        {quizData?.length > 0 ? (
                            <Quizzes quizData={quizData} selectedKeyword={selectedKeyword} />
                        ) : (
                            <p>문제 준비중입니다...</p>
                        )}
                    </S.QuizSection>
                ) : (
                    <>
                        {quizData?.length > 0 ? (
                            <S.Button>
                                <S.QuizButton onClick={handleStartQuiz}>
                                    <p>문제 보기</p>
                                </S.QuizButton>
                            </S.Button>
                        ) : (
                            <S.QuizSection>
                                <p>문제 준비중입니다...</p>
                            </S.QuizSection>
                        )}
                    </>
                )}
            </S.CustomTabPanel>


        </S.CustomTabs>
    );
};

export default MainPageTabs;