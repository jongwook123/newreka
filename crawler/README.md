# Crawling

## 0907

네이버뉴스 url을 통해 BeautifulSoup를 사용하여 크롤링

- 상위 태그로 영역을 불러 온 후 하위 영역의 정보 추출

- 기본적으로 class로 접근하되, 불가능할 시 기본 태그로 접근

Selenium을 사용하지 않고 BeautifulSoup를 사용한 이유

- 해당 페이지가 동적이지 않았고 많은 양의 데이터를 처리할때 
  BeautifulSoup가 더 빠른 작업속도를 가짐

## 0911

크롤링한 데이터들을 링크를 기준으로 업데이트될때마다 추가하는 로직을 구성함

- 실제로 코드를 돌려보니 기사링크와 이미지만 다른 같은 제목,내용의 기사들이 중첩됨
  -> 필터링을 어떤방식으로 해야할지 다시 구상해봐야할듯.

## 0912

0911에 존재했던 기사중복문제를 해결하기위해 set구조를 도입하여 문제를 해결하였음