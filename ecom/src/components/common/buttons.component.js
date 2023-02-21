import React from "react";
import { Button } from "react-bootstrap";
const ButtonComponent = ({ showCancel, cancelText, submitText }) => {
    return (<>
        {
            (showCancel) ? <>
                <Button type='reset' variant='danger' className='me-3'>
                    {cancelText}
                </Button>
            </> : <></>
        }
        <Button type='submit' variant='success'>
            {submitText}
        </Button>
    </>)
}
export default ButtonComponent;