import {cloneElement, createContext, useContext, useState} from "react";
import {createPortal} from "react-dom";
import {HiXMark} from "react-icons/hi2";
import {useOutsideClick} from "../hooks/useOutsideClick";

/**
 * Modal
 * -----
 * Reusable modal system built with the compound component pattern.
 *
 * Why this exists:
 * - Allows different parts of the UI to open specific modal windows
 * - Uses React Context to share the currently open modal state
 * - Uses a React portal so the modal renders above the main layout
 * - Supports closing by clicking the close button or outside the modal
 *
 * Main API:
 * <Modal>
 *   <Modal.Open opens="window-name">
 *     <Button>Open modal</Button>
 *   </Modal.Open>
 *
 *   <Modal.Window name="window-name">
 *     <SomeComponent />
 *   </Modal.Window>
 * </Modal>
 *
 * Notes for future group:
 * - "opens" in Modal.Open must match "name" in Modal.Window
 * - The modal injects an "onCloseModal" prop into its child component
 * - The modal content is rendered with createPortal(document.body)
 * - Outside click behavior is handled by the useOutsideClick hook
 */

const ModalContext = createContext();

function Modal({children}) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{openName, close, open}}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({children, opens: opensWindowName}) {
  const {open} = useContext(ModalContext);
  return cloneElement(children, {onClick: () => open(opensWindowName)});
}

function Window({children, name}) {
  const {openName, close} = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 z-1000 h-screen w-full bg-black/30 backdrop-blur-sm transition-all duration-500">
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 z-1001 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-surface shadow-2xl transition-all duration-500"
      >
        <button
          onClick={close}
          className="absolute top-3 right-5 rounded-md p-1 cursor-pointer  text-text-secondary transition-colors hover:bg-bg"
        >
          <HiXMark className="h-5 w-5" />
        </button>

        <div>{cloneElement(children, {onCloseModal: close})}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
