import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ largeImage, tags, onClose }) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (evt) => {
    if (evt.code === "Escape") {
      onClose();
    }
  };

  const handleClickOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleClickOverlay}>
      <div className="Modal">
        <img src={largeImage} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = (evt) => {
//     if (evt.code === "Escape") {
//       this.props.onClose();
//     }
//   };

//   handleClickOverlay = (evt) => {
//     if (evt.target === evt.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { largeImage, tags } = this.props;

//     return createPortal(
//       <div className="Overlay" onClick={this.handleClickOverlay}>
//         <div className="Modal">
//           <img src={largeImage} alt={tags} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
