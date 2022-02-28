import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");
console.log(modalRoot)

const Modal = ({ children }) => {
  // using Ref here guarantees a unique portal for this Modal
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);//when you need me, make me in the DOM!
    return () => modalRoot.removeChild(elRef.current);//done? alway clean the DOM!
  }, [])

  return createPortal(<div>{children}</div>, elRef.current)
 }

 export default Modal;