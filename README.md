# <img src="./public/logo.svg" width> 미야옹 (Meowng)

> [미야옹 서비스 보러가기](https://www.meowng.com/) <br>
> **미야옹**은 동물 시점 SNS 서비스입니다.<br>
> 사용자들이 반려동물과 관련된 게시물을 공유하고, 이벤트에 참여하며, 다른 사용자들과 소통할 수 있는 모바일 친화적인 웹 애플리케이션입니다.<br>

## 🛠 기술 스택

> [기술 스택 선정 문서](https://github.com/100-hours-a-week/9_meow_wiki/wiki/%5BFE%5D%EA%B8%B0%EC%88%A0_%EC%8A%A4%ED%83%9D_%EC%84%A0%EC%A0%95)

<img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge" /> <img src="https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge" /> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" /> <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /> <img src="https://img.shields.io/badge/zustand-602c3c?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAA8FBMVEVHcExXQzpKQDlFV16lpqyGh4tPPTdWT0weHRU7LRZGQzmxYjlaTkZsbmywVyxtXDSFhISXm6WWpcaytb6bm56gprY0LiiXmp2prLamsMa0XS42MSxkTUVDSkuyYzGihXdDV2GprbmedVxaRD1kTUWUdGFGOCN4a2OfpbI0SFFAMSddTkbCc0dWQiGFRypXQyJUQCBcTTWviDVXQyJcUDjlqCWxjkG+hBTiohtURD6lr8lORTtDVVZmPyxwSipaRSJDOzaWpsyYqMyYqM2dq8tPOjBERTs6QUKTcCeKaCJvViZdSDK4iSngoiDvqx7KkRuGEi1hAAAAOXRSTlMApZ78cB8hCAMQO/j/FOH4KlT1wFfJTjaY6SxtVexFn3Tn2sN6d671mVuJ+/PPN9CT6TfpS4C9jJaVLRihAAAAi0lEQVQIHXXBxRKCUAAF0Es/QMDubsVuGrv1///GBQ4bx3PwgwC8gFCRohs8QrQV0ZtKOZ9JcgBmU8MwqFa9kjNTUWB58f2jPOjU9juTBTbPq+vIar972MZjwPr1uDvqCFw2wQpQVm/t7Oo9gAgAFtrtZNtMFQFp7nkWU5IQECfjYbuQFvBFRJHgjw9L0A80UmaGpAAAAABJRU5ErkJggg==" /> <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge" /> <img src="https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge" />

## ✨ 주요 기능

### 📱 핵심 기능

- **게시글**: 게시글 작성, 수정, 삭제 등
  - 게시글을 작성하면 AI가 고양이/강아지 말투로 변환해줌 
- **소셜 기능**: 좋아요, 댓글, 팔로우 등
- **사용자 프로필**: 개인 정보 관리 및 프로필 편집
- **이벤트**: 매 주 이벤트 신청, 무제한 투표 등

### 🎉 이벤트 시스템

- **이벤트 참여**: 다양한 반려동물 이벤트에 참여
- **투표 시스템**: 이벤트 관련 투표 기능
- **이벤트 제출**: 사용자 생성 이벤트 콘텐츠

### 🎨 UI/UX

- **반응형 디자인**: 모바일 최적화된 인터페이스
- **무한 스크롤**: 게시물 목록의 부드러운 로딩
- **스켈레톤 로딩**: 사용자 경험 향상을 위한 로딩 상태

| 메인 페이지 | 게시글 작성 페이지 | 마이 페이지 |
|:--:| :--: | :--: |
| <img width="430" alt="image" src="https://github.com/user-attachments/assets/d54bd451-c5f3-4cd0-99a2-5ea9e7bed380" /> | <img width="428" alt="image" src="https://github.com/user-attachments/assets/3bbf90e1-ed34-4368-86c2-7f2a686be2b5" /> | <img width="429" alt="image" src="https://github.com/user-attachments/assets/5b2ae3e1-d8e2-49fa-ac73-7e744d09f32a" /> |


## 📁 프로젝트 구조

```
src/
├── app/                   # 페이지 컴포넌트
│   ├── MainPage.tsx       # 메인 피드 페이지
│   ├── create/            # 게시물 작성
│   ├── detail/            # 게시물 상세
│   ├── edit/              # 게시물 편집
│   ├── login/             # 로그인
│   ├── signup/            # 회원가입
│   ├── mypage/            # 마이페이지
│   ├── member/            # 사용자 프로필
│   ├── event/             # 이벤트 관련 페이지
│   ├── chat/              # 채팅
│   └── not-found/         # 404 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── common/            # 공통 컴포넌트
│   ├── pages/             # 페이지별 컴포넌트
│   └── ui/                # UI 프리미티브
├── api/                   # API 관련
│   ├── instance/          # Axios 인스턴스
│   ├── queries/           # React Query 쿼리
│   ├── types/             # API 타입 정의
│   └── *.ts               # API 함수들
├── hooks/                 # 커스텀 훅
├── store/                 # Zustand 스토어
├── types/                 # 타입 정의
├── utils/                 # 유틸리티 함수
└── lib/                   # 라이브러리 설정
```
## 🔍 More
> [BE 레포지토리](https://github.com/100-hours-a-week/9_meow_be)<br>
> [AI 레포지토리](https://github.com/100-hours-a-week/9_meow_ai)

---

**Meowng** - 반려동물과 함께하는 소셜 미디어 플랫폼 🐾
