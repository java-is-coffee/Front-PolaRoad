import React, { createContext, useContext, useState } from "react";
import ModalOption from "../../enum/modalOptionTypes";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export const useModal = () => useContext(ModalContext);

interface ModalConfig {
  [key: string]: any;
}

interface ModalContextType {
  modals: ModalConfig;
  registerModal: (modalKey: ModalOption, modalComponent: JSX.Element) => void;
  openModal: (modalKey: ModalOption) => void;
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

  const openModal = (modalKey: ModalOption) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalKey]: { ...prevModals[modalKey], isOpen: true },
    }));
  };

  const closeModal = (modalKey: ModalOption) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalKey]: { ...prevModals[modalKey], isOpen: false },
    }));
  };

  const value = { modals, registerModal, openModal, closeModal };

  return (
    <ModalContext.Provider value={value}>
      {children}{" "}
      {Object.keys(modals).map((key) =>
        modals[key].isOpen ? <div key={key}>{modals[key].component}</div> : null
      )}
    </ModalContext.Provider>
  );
};
