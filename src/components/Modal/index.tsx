import React, { ReactNode } from "react";
import "/src/components/Modal/modal.css";
import { BTN } from "../Button";
import { CloseIcon } from "../../assets/icons";
interface modalProps {
  showHeader?: boolean;
  children?: any;
  closeModal: (e: React.MouseEvent<HTMLElement>) => void;
  onConfirm: (e: React.MouseEvent<HTMLElement>) => void;
  showCloseIcon?: boolean;
  showfooter?: boolean;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
  closeButtonClassName?: string;
  showConfirmButton?: boolean;
  confirmButtonLabel?: string;
  confirmButtonClassName?: string;
  headerClassName?: string;
  isConfirmButtonDisabled?: boolean;
  loading?: boolean;
  modalWidth?: string;
}

const Modal = ({
  showHeader,
  children,
  closeModal,
  onConfirm,
  showCloseIcon,
  showfooter,
  showCloseButton,
  closeButtonLabel,
  closeButtonClassName,
  showConfirmButton,
  confirmButtonLabel,
  confirmButtonClassName,
  headerClassName,
  loading,
  modalWidth,
  isConfirmButtonDisabled,
}: modalProps) => {
  const findByKey = (children: ReactNode, key: string) => {
    const result: ReactNode[] = [];
    const childrenArray = Array.isArray(children) ? children : [children];
    childrenArray.map((child: any) => {
      if (child.key === key) {
        result.push(child);
      }
    });
    return result;
  };

  const onCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    return closeModal(e);
  };

  return (
    <div className="modal-mask modal-close">
      <div className="modal-wrapper">
        <div
          className="modal-container"
          style={{
            maxWidth: modalWidth ? modalWidth : "512px",
            minWidth: "512px",
          }}
        >
          {showCloseIcon && (
            <button onClick={onCloseModal} className="close-button">
              <CloseIcon />
            </button>
          )}

          {showHeader && (
            <div
              className={`modal-header ${
                headerClassName ? headerClassName : ""
              }`}
            >
              {findByKey(children, "header")}
            </div>
          )}

          <div className="modal-body">{findByKey(children, "body")}</div>

          {showfooter && (
            <div className="modal-footer">
              {showCloseButton && (
                <BTN
                  text={closeButtonLabel ? closeButtonLabel : "Cancel"}
                  className={closeButtonClassName ? closeButtonClassName : ""}
                  onClick={onCloseModal}
                />
              )}

              {showConfirmButton && (
                <BTN
                  text={confirmButtonLabel ? confirmButtonLabel : "Confirm"}
                  className={
                    confirmButtonClassName ? confirmButtonClassName : ""
                  }
                  onClick={onConfirm}
                  loading={loading}
                  disabled={isConfirmButtonDisabled}
                />
              )}
              {findByKey(children, "footer")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
