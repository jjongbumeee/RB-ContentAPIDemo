# 사용 방법
1. [/src/appsScript.gs](https://github.com/epicmobile18/RB-ContentAPIDemo/blob/master/src/appsScript.gs) 파일을 Google spreadsheet 스크립트 편집기에 삽입
2. [Line 71](https://github.com/epicmobile18/RB-ContentAPIDemo/blob/master/src/appsScript.gs#L71)의 API url 입력
3. API 서버에 deploy
4. Google spreadsheet 메뉴에서 `export WP Structured-data` 선택 실행
 
# 1. gcloud sdk 설치
- https://cloud.google.com/sdk/docs/downloads-interactive?hl=ko#linux  //gcp 문서
- https://jybaek.tistory.com/648?category=696494
# 2. gcloud 프로젝트 설정 (gcloud sdk 로그인 이후)
```
gcloud app describe //현재 프로젝트 확인

gcloud projects list    //프로젝트 리스트


gcloud config set project [PROJECT_ID]  //프로젝트 설정

```
# 3. 배포

```
$ yarn dev //local test
$ yarn deploy // 빌드 파일 생성후 gcloud deploy 실행


```
# ContentsDataUpdater
---
## 프로젝트 진행상황  
1. [/src/index.ts](https://github.com/epicmobile18/RB-ContentsDataUpdater/blob/master/src/index.ts) <img src="https://img.shields.io/badge/status-complete-green" align = "center"/>
  - typescript 코드를 이용하여 로컬의 ExportedData를 아래의 sampleoutput형태로 변경하여 출력하는 작업 
  - sampleoutput 형태의 output 데이터를 MongoDB에 업로드 하는 작업 완료
  - **실행 방법**
    > yarn dev  
    - 아래 설명되어 있는 wsl 환경 설정 이후 프로젝트 디렉토리에서 위 명령어 실행하시면 됩니다.
    
  
2. [/appsScript.gs](https://github.com/epicmobile18/RB-ContentsDataUpdater/blob/master/appsScript.gs) <img src="https://img.shields.io/badge/status-complete-green" align = "center"/>
  - Google Apps script를 이용하여 Node.js를 거치지 않고 바로 데이터를 파싱할 수 있도록 하는 작업 완료
  - `exportData`는 outputsample 형태로 출력하는 메소드
  - `exportSheetData`는 데이터를 가공하지 않고 json 형식으로 출력하는 메소드
  - 두 가지 기능 모두 `initMenu` 실행시 GSheet 메뉴에서 선택할 수 있도록 코드 작성 완료
  - MongoDB에 insert하는 부분은 ~아직 구현되지 않음~ 구현 완료
    - 해당 부분은 API 서버를 따로 두어 Post로 해결~할 예정~
    - GSheet Apps Script(POST) → 별도 API 서버(Google Appengine) → MongoDB insert
    - [RB-ContentAPIDemo Repo](https://github.com/epicmobile18/RB-ContentAPIDemo)에서 작업 완료
  - **실행 방법**
    - 해당 코드는 *"레디베이비-조사자료-콘텐츠데이터"* 파일에 연결된 스크립트 편집기에 업로드 되어있습니다. (또는 사용을 원하시는 스크립트 편집기에 복사 해주세요.)
    - 해당 문서에 접근하셔서 *도구 - 스크립트 편집기*로 접속하시면 해당 메소드들을 실행할 수 있습니다.
    - 파싱 결과는 스크립트 편집기의 *보기 - 로그*를 선택하셔야 볼 수 있습니다.
    - 또는 [Apps Script 대시보드](https://script.google.com/home/projects/1zJqA3cGaBHupIo2tj31cNeTGEWcPCtTFb_DB_SkFHSlYNPz7NB7fcpPO/executions?run_as=1)에서 json 형태로 포맷팅된 로그를 편하게 보실 수 있습니다.

## export sheet

staticContents_품목7가지(앱 주요 물품)

staticContents_시기

<hr/>

### sampleoutput
```json
{
"id": 5900,
    "date": "2020-07-15T15:58:33",  //생성 시간 date
    "date_gmt": "2020-07-15T06:58:33",
    "type": "post", //naver or youtube 
    "link": "https:\/\/readybaby.net\/time-guide\/midtrimester\/5900\/", //fullUrl
    "title": {
      "rendered": "임신중기4~8개월" //[site] + searchkeyword
    },
    "content": {
      //naver면 fullUrl /youtube면 embed-->
      "rendered": "",
      "protected": false
    },    
    "featured_media": 0, 
    //카테고리
    "categories": [
      188
    ],
    //태그
    "tags": [
      231,
      230,
      143,
      145
    ],
    "featured_image_src": null, //thumnailUrl      
}
```


### 개발환경 세팅
 <hr>

vscode
* https://code.visualstudio.com/

wsl 1 설치 (2버전은 선택사항  cpu 가상화 지원시 해도 좋다.)

* https://lahuman.github.io/windows-wsl-setting/
```
설치완료시 vscode에서 ctrl+` 로 터미널창 띄우고 default shell WSL bash로 변경

 wsl home 디렉토리 window 경로 : \\wsl$\Ubuntu-18.04\home\username

 wsl2 사용시 해당 경로에 올려야 속도도 정상적이고 파일 변경 이벤트가 문제없이 적용됨
```
*  해당 페이지에서 node까지 설치후 

```
 $ npm install -g yarn
 ```
* 프로젝트 clone 이후 

 ```
 $ yarn 
```

vscode-exetension (ctrl+shift+x)

* Remote-wsl
* https://musma.github.io/2019/07/11/vscode-extension.html


git GUI Client (취향)

* https://desktop.github.com/
* https://www.gitkraken.com/
* https://www.sourcetreeapp.com/



 
mongodb atlas 연결 
* https://moonsupport.tistory.com/262
* https://docs.mongodb.com/manual/reference/method/js-collection/

<hr>

### Reference

1. git, github
    - https://ux.stories.pe.kr/182
    - https://www.youtube.com/watch?v=YFNQwo7iTNc
    - https://playinlion.tistory.com/30

2. javascript, typescript
    - https://opentutorials.org/course/743
    - https://haviyj.tistory.com/3
    - https://heropy.blog/2020/01/27/typescript/  

3. lodash
    - http://jeonghwan-kim.github.io/lodash/
    - https://ithub.tistory.com/189
