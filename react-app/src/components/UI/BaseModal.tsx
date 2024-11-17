import {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { BaseModalProps } from "../../models/BaseModalProps";
import { DialogHandle } from "../../models/DialogHandle";

import styles from "../../styles/BaseModal.module.css";

const BaseModal = forwardRef<DialogHandle, PropsWithChildren<BaseModalProps>>(
  (props, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current!.showModal();
        },
        close() {
          dialog.current!.close();
        },
      };
    });

    function handleCloseModal() {
      dialog.current!.close();
    }

    return createPortal(
      <dialog className={styles.modal} ref={dialog} onClose={handleCloseModal}>
        <header className={styles["modal-header"]}>
          <h2></h2>
          <h2>{props.title}</h2>
          <h2 className={styles.close} onClick={handleCloseModal}>
            X
          </h2>
        </header>

        <div className={styles["modal-content"]}>{props.children}</div>
      </dialog>,
      document.getElementById("modal")!,
    );
  },
);

export default BaseModal;
