# 시작하기

모달 관리 시스템을 사용하기 시작하려면, 애플리케이션 또는 컴포넌트 트리를 ModalProvider로 감싸주어야 합니다. 이렇게 하면 모든 자식 컴포넌트에 모달 컨텍스트가 사용 가능하게 됩니다.

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "./path/to/ModalContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

# 사용 방법

## 모달 등록하기

모달을 열기 전에, 모달 컨텍스트에 모달을 등록해야 합니다. 이는 registerModal 함수를 호출하여 수행되며, 일반적으로 모달이 정의된 컴포넌트나 애플리케이션의 모달을 초기화하는 부모 컴포넌트에서 이루어집니다.

```tsx
import React, { useEffect } from "react";
import { useModal } from "./path/to/ModalContext";
import MyModalComponent from "./MyModalComponent";
import ModalOption from "./path/to/enum/modalOptionTypes";

function MyApp() {
  const { registerModal } = useModal();

  useEffect(() => {
    registerModal(ModalOption.MyModalKey, <MyModalComponent />);
  }, [registerModal]);

  return <div>My Application</div>;
}
```

## 모달 열기 및 닫기

모달을 열거나 닫으려면, 모달 컨텍스트에서 제공하는 openModal과 closeModal 함수를 사용합니다. 이 함수들은 작업하고자 하는 모달의 키를 요구합니다.

```tsx
import React from "react";
import { useModal } from "./path/to/ModalContext";
import ModalOption from "./path/to/enum/modalOptionTypes";

function OpenModalButton() {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => openModal(ModalOption.MyModalKey);
  const handleCloseModal = () => closeModal(ModalOption.MyModalKey);

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <button onClick={handleCloseModal}>Close Modal</button>
    </div>
  );
}
```

# API 참조

## 컨텍스트 제공자

### ModalProvider

모달 관리 컨텍스트를 자식에게 제공하는 컴포넌트입니다. 애플리케이션 또는 컴포넌트 트리를 이 제공자로 감싸주세요.

### Hook

- useModal: 모달 관리 기능에 접근하기 위한 사용자 정의 훅입니다. modals, registerModal, openModal, closeModal 함수를 포함한 객체를 반환합니다.

### functions

1. registerModal(modalKey: ModalOption, modalComponent: JSX.Element)
   주어진 키와 컴포넌트를 사용해 모달을 등록합니다. 키는 모달의 고유 식별자로, 일반적으로 열거형 값입니다.

2. openModal(modalKey: ModalOption)
   주어진 키와 연결된 모달을 엽니다

3. closeModal(modalKey: ModalOption)
   주어진 키와 연결된 모달을 닫습니다.
