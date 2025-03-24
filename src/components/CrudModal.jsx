import ReactDOM from 'react-dom';
import '../App.css';

const CrudModal = ({ children, onClose  }) => {
    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default CrudModal;