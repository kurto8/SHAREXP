import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.createElement('div');

function Modal({ children }) {
  // using Ref here guarantees a unique portal for this Modal
  const elRef = useRef();
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    document.body.appendChild(modalRoot); // when you need me, make me in the DOM!
    modalRoot.setAttribute('id', 'modal'); // give me style
    modalRoot.appendChild(elRef.current);  // append the container for my children
    return () => document.body.removeChild(modalRoot); //done? remove me from/clean the DOM!
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
}

export default Modal;
