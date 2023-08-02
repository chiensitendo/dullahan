import { resetEnterCode, submitCode, triggerEnterCode, updateCode } from '@/redux/notiSlice';
import { RootState } from '@/redux/store';
import { TextInput } from 'carbon-components-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from './use-auth';
import { useEffect } from 'react';
import { FORM_LINK } from '@/type/const';
import { clearForm } from '@/redux/formSlice';


const ModalWrapper = dynamic(import('carbon-components-react').then(mod => mod.Modal), { ssr: false }) // disable ssr

const EnterCodeModal = () => {
    const { isOpen, isSuccess, userToken, code } = useSelector((state: RootState) => state.notification.codeModal);
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useAuth();
    useEffect(() => {
        if (isSuccess &&  userToken) {
            auth.clearAuth();
            auth.setAuth({
                access_token: userToken.access_token,
                expires_in: userToken.expires_in,
                refresh_token: userToken.refresh_token,
                token_type: userToken.token_type,
                is_new: false
            });
            dispatch(resetEnterCode());
            dispatch(clearForm());
            window.location.href = FORM_LINK;
        }
    },[isSuccess, userToken]);
    return <div >
        <ModalWrapper
            className="modal-wrapper enter-code-modal"
            modalHeading="Enter the code to reload your saved report"
            primaryButtonText="Reload saved report"
            secondaryButtonText="Cancel"
            primaryButtonDisabled = {!code}
            onRequestSubmit={e => {
                if (!code) {
                    return;
                }
                dispatch(submitCode(code));
            }}
            onSecondarySubmit={e => {
                dispatch(triggerEnterCode(false));
            }}
            onRequestClose={e => {
                dispatch(triggerEnterCode(false));
            }}
            open={isOpen}
        >
            <div className='enter-code-wrapper'>
                <TextInput value={code} className='enter-code-input' id = "enter-code" name="code"
                onChange={e => dispatch(updateCode(e.target.value))} 
                placeholder='Enter code' labelText={"Code"}/>
            </div>
        </ModalWrapper>
    </div>
}

export default EnterCodeModal;