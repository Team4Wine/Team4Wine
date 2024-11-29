import { create } from 'zustand';

type Modal = {
  modals: Record<string, { isVisible: boolean; content: JSX.Element | null }>;
  openModal: (id: string, content: JSX.Element) => void;
  closeModal: (id: string) => void;
};

const useModalStore = create<Modal>((set) => ({
  modals: {},
  openModal: (id: string, content: JSX.Element) =>
    set((state: any) => ({
      modals: { ...state.modals, [id]: { isVisible: true, content } },
    })),
  closeModal: (id: string) =>
    set((state: any) => ({
      modals: { ...state.modals, [id]: { isVisible: false, content: null } },
    })),
}));

export default useModalStore;
