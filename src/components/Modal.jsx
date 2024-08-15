import { observer } from 'mobx-react-lite';


function Modal(props) {
    if(!props.show)
    {
        return null
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Notification</h4>
                </div>
                <div className="modal-body">
                <label>Todos from API added successfully! </label>
                    
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default observer(Modal);