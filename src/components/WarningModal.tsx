import { forwardToEnterCode, goBackToForm } from '@/redux/notiSlice';
import { RootState } from '@/redux/store';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';


const ModalWrapper = dynamic(import('carbon-components-react').then(mod => mod.Modal), { ssr: false }) // disable ssr

const WarningModal = () => {
    const { isWarning } = useSelector((state: RootState) => state.notification);
    const dispatch = useDispatch();
    return <div >
        <ModalWrapper
            modalLabel = "Warning"
            className="modal-wrapper enter-code-modal"
            modalHeading="You’re about to leave form to reload saved result."
            primaryButtonText="Leave form"
            secondaryButtonText="Return to form"
            danger
            onRequestSubmit={e => {
                dispatch(forwardToEnterCode());
            }}
            onSecondarySubmit={e => {
                dispatch(goBackToForm());
            }}
            onRequestClose={e => {
                dispatch(goBackToForm());
            }}
            open={isWarning}
        >
            <div className='enter-code-wrapper'>
                <p className='body-01'>Any information you’ve entered won’t be saved, so you’ll have to reenter it the next time you return.</p>
            </div>
        </ModalWrapper>
    </div>
}

export default WarningModal;