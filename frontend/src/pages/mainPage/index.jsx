import Header from 'component/header';
import Footer from 'component/footer';
import * as S from './style';
import WordCloudPage from './WordCloud';
import MainPageTabs from 'component/tabs/mainPageTabs';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { GetKeyword } from 'APIs/KeywordAPIs';
import TimeBar from 'component/timebar';
import { GetTimeKeyword } from 'APIs/KeywordAPIs';

export default function MainPage() {
  const accessToken = useSelector(state => state.user.accessToken);
  const isLoggedIn = !!accessToken;
  const menuname = isLoggedIn ? 'My page' : 'Login';

  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [data, setData] = useState({ quizList: [] });
  const [selectedTime, setSelectedTime] = useState(null);
  const [baseTime, setBaseTime] = useState(null);

  const fetchData = async () => {
    try {
      const fetchedData = await GetKeyword();
      setData(fetchedData);

      if (baseTime === null && fetchedData.quizList.length > 0) {
        setBaseTime(fetchedData.quizList[0].time);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (selectedTime) {
      const date = new Date(selectedTime);
      date.setHours(date.getHours() - 9);

      const year = date.getFullYear(); // 년도
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (월은 0부터 시작하므로 +1 필요)
      const day = String(date.getDate()).padStart(2, '0'); // 일
      const hours = String(date.getHours()).padStart(2, '0'); // 시간
      const minutes = String(date.getMinutes()).padStart(2, '0'); // 분

      const formattedDate = `${year}${month}${day}${hours}${minutes}`;
      console.log(formattedDate)
      GetTimeKeyword(formattedDate)
        .then(fetchedData => setData(fetchedData))
        .catch(error => console.log(error));
    }
  }, [selectedTime]);

  console.log(data)

  useEffect(() => {
    // 함수를 만들어서 현재 시간의 분 끝자리가 2일 때 fetchData를 호출하도록 설정
    const fetchDataOn2ndMinute = () => {
      const currentMinute = new Date().getMinutes();
      if (currentMinute % 10 === 2) {
        fetchData();
      }
    };

    // 최초 실행
    fetchData();

    // 1분마다 fetchDataOn2ndMinute를 호출하여 분 끝자리가 2일 때 fetchData 호출
    const intervalId = setInterval(fetchDataOn2ndMinute, 60000);

    // 컴포넌트가 언마운트될 때 clearInterval하여 타이머 정리
    return () => clearInterval(intervalId);
  }, []);

  const handleWordClick = (selectedWord) => {
    setSelectedKeyword(selectedWord);
  }

  return (
    <S.Main>
      <Header menuname={menuname} />
      <S.BodySection>
        <S.Body>
          <h2>HOT 10</h2>
          {data && data.quizList && data.quizList.length > 0 &&
            <>
              <WordCloudPage onWordClick={handleWordClick} data={data} />
              {baseTime && <TimeBar baseTime={baseTime} setSelectedTime={setSelectedTime} selectedTime={selectedTime} />}
            </>
          }

        </S.Body>
        <S.Body id="body2">
          <h2>{selectedKeyword}</h2>
          {data && <MainPageTabs selectedKeyword={selectedKeyword} data={data} />}
        </S.Body>
      </S.BodySection>
      <Footer />
    </S.Main>
  );
}