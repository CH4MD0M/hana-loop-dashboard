export const ModalTypes = {
  CONFIRM: 'confirm-modal',
  CREATE_REPORT: 'create-report',
  EDIT_REPORT: 'edit-report',
} as const;

export type ModalId = (typeof ModalTypes)[keyof typeof ModalTypes];
