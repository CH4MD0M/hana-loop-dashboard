'use client';

import { useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ModalId } from '@/types/Modal';
import { Report } from '@/types/Report';
import { useModalStore } from '@/store/use-modal-store';

import { companies } from '@/lib/data/companies';
import { createOrUpdateReport } from '@/lib/api';
import {
  reportFormSchema,
  type ReportFormData,
  getDefaultReportValues,
  transformToReportData,
} from '@/lib/schemas/reports';

import { BaseModal } from '@/components/modal/base-modal';
import { ConfirmModal } from '@/components/modal/confirm-modal';
import FormField from '@/components/input-field/form-field';
import InputField from '@/components/input-field/input-field';

import styles from './report-modal.module.css';

interface ReportModalProps {
  mode: 'create' | 'edit';
  report?: Report;
  onReportCreated?: (newReport: Report) => void;
  onReportUpdated?: (updatedReport: Report) => void;
  closeOnlyByAction?: boolean;
}

const ReportModal = ({
  mode,
  report,
  onReportCreated,
  onReportUpdated,
  closeOnlyByAction = true,
}: ReportModalProps) => {
  const { openModal, closeModal } = useModalStore(['openModal', 'closeModal']);
  const modalName: ModalId = mode === 'create' ? 'create-report' : 'edit-report';

  const methods = useForm<ReportFormData>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: getDefaultReportValues(),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = methods;

  useEffect(() => {
    if (mode === 'edit' && report) {
      reset({
        resourceUid: report.resourceUid,
        title: report.title,
        content: report.content,
      });
    } else if (mode === 'create') {
      reset(getDefaultReportValues());
    }
  }, [mode, report, reset]);

  // 취소 버튼 클릭
  const handleCancel = useCallback(() => {
    if (isDirty) {
      openModal(
        'confirm-modal',
        <ConfirmModal
          title="작성 중인 게시글이 있습니다"
          content="작성 중인 내용이 저장되지 않습니다. 정말 나가시겠습니까?"
          closeBtnText="계속 작성"
          confirmBtnText="나가기"
          onClose={() => closeModal('confirm-modal')}
          onConfirm={() => {
            closeModal('confirm-modal');
            closeModal(modalName);
          }}
          closeOnlyByAction={true}
        />
      );
    } else {
      closeModal(modalName);
    }
  }, [isDirty, openModal, closeModal, modalName]);

  // 게시글 저장
  const onSubmit = useCallback(
    async (formData: ReportFormData) => {
      try {
        const reportData = transformToReportData(formData);

        const dataWithId =
          mode === 'edit' && report ? { ...reportData, id: report.id } : reportData;

        const savedReport = await createOrUpdateReport(dataWithId);

        if (mode === 'create' && onReportCreated) onReportCreated(savedReport);
        else if (mode === 'edit' && onReportUpdated) onReportUpdated(savedReport);

        closeModal(modalName);
      } catch (error) {
        alert(`게시글 ${mode === 'create' ? '저장' : '수정'}에 실패했습니다. 다시 시도해주세요.`);
      }
    },
    [mode, report, modalName, onReportCreated, onReportUpdated, closeModal]
  );

  return (
    <>
      <BaseModal name={modalName} closeOnlyByAction={closeOnlyByAction}>
        <FormProvider {...methods}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          >
            <h2 className={styles.title}>새 게시글 작성</h2>

            <div className={styles.fieldsContainer}>
              {/* 회사 선택 */}
              <FormField>
                <FormField.Title title="회사 선택" isRequired={true} />
                <InputField
                  name="resourceUid"
                  renderInput={(field, fieldState) => (
                    <select
                      {...field}
                      className={`${styles.baseInput} ${styles.select} ${
                        fieldState.error ? styles.inputError : ''
                      }`}
                    >
                      <option value="">회사를 선택해주세요</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name} ({company.country})
                        </option>
                      ))}
                    </select>
                  )}
                />
              </FormField>

              {/* 제목 */}
              <FormField>
                <FormField.Title title="제목" isRequired={true} />
                <InputField
                  name="title"
                  renderInput={(field, fieldState) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="게시글 제목을 입력하세요"
                      className={`${styles.baseInput} ${fieldState.error ? styles.inputError : ''}`}
                    />
                  )}
                />
              </FormField>

              {/* 내용 */}
              <FormField>
                <FormField.Title title="내용" isRequired={true} />
                <InputField
                  name="content"
                  renderInput={(field, fieldState) => (
                    <textarea
                      {...field}
                      placeholder="게시글 내용을 입력하세요"
                      className={`${styles.baseInput} ${styles.textarea} ${
                        fieldState.error ? styles.inputError : ''
                      }`}
                    />
                  )}
                />
              </FormField>
            </div>

            <div className={styles.buttonContainer}>
              <button
                type="button"
                onClick={handleCancel}
                className={`${styles.buttonBase} ${styles.cancelButton}`}
              >
                취소
              </button>
              <button
                disabled={!isValid || !isDirty}
                type="submit"
                className={`${styles.buttonBase} ${styles.submitButton}`}
              >
                {mode === 'create' ? '게시글 작성' : '게시글 수정'}
              </button>
            </div>
          </form>
        </FormProvider>
      </BaseModal>
    </>
  );
};

export default ReportModal;
