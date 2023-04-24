#### 23.04.10

### 오늘의 기획

- 컬러링북, 펜팔 어플리케이션
- 포트폴리오&이력서 작성 서비스
  - 관련하여 기획 배경, 주요 기능, 타겟층 등을 작성
- 아나운서 발음 연습 서비스

#### 23.04.11

### 오늘의 기획 - 새로운 주제로 리프레시

- 컬러링북, 펜팔 어플리케이션을 어느정도로 구체화시킬 것인가? 고민해봐야 한다.
  - 사이즈를 어떻게 가져갈지
  - 컬러링북과 펜팔 둘 중 어떤 방향에 집중하고 메인으로 가져갈 것인가
  - 웹/앱과 어울릴지 장단점 따져보자
- 아예 새로운 방향의 서비스 고민

#### 23.04.13

### 오늘의 기획 - 기술과 깊이에 집중하는 주제를 선택하기

- 해보고 싶은 기능
  - 카카오톡 등 외부에 공유할 때 사용자가 원하는 것만 토글로 선택해서 일부만 공유할 수 있도록 하는 기능

#### 23.04.19

### Redux 기본 용어

- store
  - 컴포넌트의 상태를 관리하는 저장소. 하나의 프로젝트는 하나의 스토어를 가진다.
- action
  - store의 상태를 변경하기 위해 생성해야 하는 것. 액션은 객체이며, 반드시 type을 가져야 한다. 액션생성함수에 의해서 만들어진다.
- reducer
  - 현재 상태와 액션 객체를 받아 새로운 상태를 리턴하는 함수.
- dispatch
  - 액션 객체를 넘겨줘 상태를 업데이트 시켜주는 store의 내장 함수.
- subscribe
  - 리듀서가 호출될 때 서브스크라이브된 함수 및 객체를 호출한다.
- 흐름 설명
  1. UI가 처음 렌더링될 때, UI 컴포넌트는 리덕스 스토어의 상태에 접근하여 해당 상태를 렌더링
  2. 이후 UI에서 상태가 변경되면, 앱은 dispatch를 실행하여 action을 일으킴
  3. 새로운 action을 받은 store는 reducer를 실행하고 reducer를 통해 나온 값을 새로운 상태로 저장
  4. subscribe된 UI는 상태 업데이트로 변경된 데이터를 새롭게 렌더링

#### 23.04.20

### TypeScript의 다형성

- 다형성, 제네릭, 클래스, 인터페이스 학습

### 다형성

> 다른 모양의 코드를 가질 수 있게 하는 것

- 제네릭을 통해 이룰 수 있음
  - 제네릭 : placeholder 타입을 쓸 수 있도록 함
  - 타입스크립트가 placeholder 타입을 concrete로 바꿔줌
  - 같은 코드를 다른 타입에 대해서 쓸 수 있도록 함

### 실습

- 브라우저에서 쓰는 로컬 스토리지 API와 비슷한 API를 가지는 클래스 만들기

```tsx
interface SStorage<T> {
  [key: string]: T;
}
class LocalStorage<T> {
  private storage: SStorage<T> = {};

  set(key: string, value: T) {
    this.storage[key] = value;
  }
  remove(key: string) {
    delete this.storage[key];
  }
  get(key: string): T {
    return this.storage[key];
  }
  clear() {
    this.storage = {};
  }
}
```

- localStorage 클래스를 초기화할 때, 타입스크립트에게 T라고 불리는 제네릭을 받을 계획임
- 제네릭은 이것을 다른 타입에게 물려줄 수 있음 → 클래스 이름에 들어오는 제네릭과 같은 제네릭을 인터페이스로 보내줄 수 있음
- 제네릭을 클래스로 보내고, 클래스는 제네릭을 인터페이스로 보낸 후 인터페이스는 제네릭을 사용

```tsx
// string 타입의 로컬 스토리지
const stringsStorage = new LocalStorage<string>();

stringsStroage.get("ket"); // string을 받아올 수 있음
stringstorage.set("hello", "how are you"); // TS가 T인 value를 string인 value로 바꿔줌 (localStorage를 string을 사용하여 만들었기 때문)

const booleansStorage = new LocalStroage<boolean>();

booleansStorage.get("xxx"); // boolean을 받아옴
booleansStorage.set("hello", true);
```

#### 23.04.23

## Figma

### Figma의 Auto layout

- Auto layout
  > 상하좌우 여백이 설정한 값으로 자동으로 생성됨

#### Hug

- Auto layout에서 정한 여백을 그대로 안고 가는 설정
- 요소 안 텍스트가 늘어나면 정해놓은 여백 그대로 요소의 크기가 유동적으로 변한다.
- 자동 모드

#### Fixed

- Auto layout에서 정한 여백을 따르지 않는 설정
- 요소 안 텍스트가 늘어나면 정해놓은 여백과 상관 없이 텍스트가 요소를 벗어난다.
- 수동 모드

### 개발 환경 세팅 전 알아두면 좋은 것 (개념 이해)

- 패키지 관리자
- npm, yarn, yarn2, ...
- 빌드툴
- webpack, vite, turbopack
- eslint
- 가져다 쓰는 거긴 하지만, 무엇인지 이해하고 쓰면 좋다
- Babel
- tailwind
- postcss-import : 후처리기
- scss : 전처리기
- 색깔, 폰트 설정
- 트윈 매크로
- 컴포넌트를 외부에서 css를 조작 가능하도록 함
- 로컬에서 https 돌아가게 설정
- next.js 환경에서 트윈 매크로가 돌아가도록 하기 위한 설정 next.config.js에 withTwin 설정
- https를 위한 key가 여러개 (4개)
- 네이밍 컨벤션
  - 컴포넌트, 함수, 변수, 디렉토리
