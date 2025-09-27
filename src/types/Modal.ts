export const ModalTypes = {
  CONFIRM: 'confirm-modal',
  CREATE_POST: 'create-post',
} as const;

export type ModalId = (typeof ModalTypes)[keyof typeof ModalTypes];
