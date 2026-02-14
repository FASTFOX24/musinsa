# 👗 AI 스타일링 추천 서비스

<p align="center">
  <img src="./assets/thumbnail.png" width="700" />
</p>

> 사용자 의류 데이터를 기반으로 실시간 날씨 맞춤형 AI 스타일링 제안 서비스


---

## 📌 프로젝트 소개

| 항목 | 내용 |
|------|----|
| 프로젝트명 | AI 스타일링 추천 서비스 |
| 간단 소개 | 사용자의 옷장 데이터를 기반으로 날씨와 상황에 맞는 스타일을 AI가 추천하는 웹 서비스 |
| 배포 링크 | https://your-deploy-url.vercel.app |

<br/>

사용자가 보유한 의류 정보를 저장하면  
실시간 날씨 + 사용자 데이터 + AI 분석을 결합하여  
가장 적합한 스타일을 추천합니다.

---

## 🛠 기술 스택

### Frontend
- Next.js 16.1 (App Router)
- TypeScript 5.0
- Styled-components

### Backend / DB
- Supabase
- Supabase Auth (Google OAuth)

### AI & External API
- OpenAI API
- Weather Open API

### Deployment
- Vercel

---

## 🎥 서비스 화면

### AI 스타일 추천
<p align="center">
  <img src="./assets/demo-recommend.gif" width="700"/>
</p>

### 아이템 관리
<p align="center">
  <img src="./assets/demo-item.gif" width="700"/>
</p>

### 프로필 & 기록
<p align="center">
  <img src="./assets/demo-profile.gif" width="700"/>
</p>

---

## ✨ 주요 기능

- Google OAuth 기반 소셜 로그인
- 의류 데이터 CRUD 관리
- 실시간 날씨 기반 AI 스타일 추천
- AI 대화 기록 로컬 저장
- 반응형 UI (모바일 / 태블릿 / 데스크탑)
- 프로필 관리 페이지

---

## 🚀 핵심 성과

### 번들 사이즈 최적화
외부 라이브러리 의존도를 줄이고  
직접 UI 컴포넌트 및 커스텀 훅을 설계하여 초기 번들 크기 절감

### 복합 데이터 기반 AI 응답 설계
OpenAI API + 실시간 날씨 API + 사용자 DB 데이터를 결합하여  
개인 맞춤형 스타일 추천 로직 구현

### 유지보수성 향상
공통 UI 패턴(모달, 생성/수정 페이지)을 레이아웃으로 추상화하여  
코드량 감소 및 생산성 향상

---

## 📡 API 구조

<p align="center">
  <img src="./assets/api-structure.png" widt
