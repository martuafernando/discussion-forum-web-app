import './ModalLayout.css';
import PropTypes from 'prop-types';

export default function ModalLayout({
  children,
}) {
  return (
    <div className="modal-layout__container">
      <div className="modal-layout">
        { children }
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
