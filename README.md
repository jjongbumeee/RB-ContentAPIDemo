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





