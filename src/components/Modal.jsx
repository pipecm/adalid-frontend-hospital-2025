import ReactDOM from 'react-dom';
import '../App.css';

export default function Modal({ children, onClose }) {
	return ReactDOM.createPortal(
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal modal-content" onClick={(e) => e.stopPropagation()}>
				{children}
				<button className="btn btn-primary btn-modal" onClick={onClose}>Cerrar</button>
			</div>
		</div>,
		document.getElementById('modal-root')
	);
}