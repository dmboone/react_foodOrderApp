import classes from './Modal.module.css';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';

// Backdrop and Modal Overlay are super lean components so we're gonna create them here and then use inside the main Modal component
const Backdrop = props => {
    return (
        <div className={classes.backdrop} />
    );
};

const ModalOverlay = props => {
    return(
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = props => {
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
}

export default Modal;