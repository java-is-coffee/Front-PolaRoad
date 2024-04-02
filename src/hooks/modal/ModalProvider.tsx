import React, { createContext, useContext, useState } from "react";
import ModalOption from "../../enum/modalOptionTypes";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export const useModal = () => useContext(ModalContext);

interface ModalConfig {
  [key: string]: {
    component: JSX.Element;
    isOpen: boolean;
    props?: { [key: string]: any }; // 열 때 전달될 props를 저장할 필드
  };
}

interface ModalContextType {
  modals: ModalConfig;
  registerModal: (modalKey: ModalOption, modalComponent: JSX.Element) => void;
  openModal: (modalKey: ModalOption, props?: { [key: string]: any }) => void;
  closeModal: (modalKey: ModalOption) => void;
}

interface ModalProviderProps {
  children: React.ReactNode; // Explicitly typing 'children'
}

const initContext: ModalContextType = {
  modals: {}, // 빈 객체로 초기화
  registerModal: (modalKey: ModalOption, modalComponent: JSX.Element) => {
    // 기본 동작 또는 빈 구현
    console.warn("registerModal function called without a provider");
  },
  openModal: (modalKey: ModalOption) => {
    // 기본 동작 또는 빈 구현
    console.warn("openModal function called without a provider");
  },
  closeModal: (modalKey: ModalOption) => {
    // 기본 동작 또는 빈 구현
    console.warn("closeModal function called without a provider");
  },
};
const ModalContext = createContext<ModalContextType>(initContext);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modals, setModals] = useState<ModalConfig>({}); // 모달들의 상태

  const registerModal = (
    modalKey: ModalOption,
    modalComponent: ReactJSXElement
  ) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalKey]: { component: modalComponent, isOpen: false },
    }));
  };

  const openModal = (modalKey: ModalOption, props?: { [key: string]: any }) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalKey]: { ...prevModals[modalKey], isOpen: true, props },
    }));
    document.body.classList.add("no-scroll");
  };

  const closeModal = (modalKey: ModalOption) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalKey]: { ...prevModals[modalKey], isOpen: false },
    }));
    document.body.classList.remove("no-scroll");
  };

  const value = { modals, registerModal, openModal, closeModal };

  return (
    <ModalContext.Provider value={value}>
      {children}{" "}
      {Object.keys(modals).map((key) =>
        modals[key].isOpen ? (
          <div key={key}>
            {React.cloneElement(modals[key].component, {
              ...modals[key].props,
            })}
          </div>
        ) : null
      )}
    </ModalContext.Provider>
  );
};
