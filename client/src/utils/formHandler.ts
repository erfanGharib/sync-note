import { AxiosResponse } from 'axios';
import * as Yup from 'yup';
import { _axios } from '../../global/global';
import { offlineModeStore } from '../store/offlineMode';
import { fireDataFetchedEvent } from './fireDataFetchedEvent';

export type T_YupSchema = { [key: string]: Yup.StringSchema };
export type T_Send = (e: Event, method?: 'put' | 'post') => void;
type FormElements = [string, HTMLInputElement];
type T_FormHandler = (args: {
    endPoint: string;
    validationSchema: T_YupSchema;
    resetForm?: boolean;
    onSuccess?: (response: AxiosResponse) => void;
    onFailure?: (response: any, data: FormData) => void;
    onSubmit?: (formData: FormData, form: Event) => Promise<any>;
    onError?: (reason: string) => void;
}) => { send: T_Send };

const formHandler: T_FormHandler = ({
    endPoint,
    validationSchema,
    resetForm = false,
    onSuccess = () => { },
    onFailure = () => { },
    onSubmit = async () => { },
    onError = () => { },
}) => {
    const expectedInputElements = ['INPUT', 'TEXTAREA', 'CHECKBOX', 'SELECT'];
    const offlineMode = offlineModeStore();
    let data = new FormData();
    let form: HTMLFormElement = null;

    const disableSubmitBtn = (
        disabled: boolean = true,
        btnSelector = 'button[type="submit"]'
    ) => {
        const button = (<Element>form).querySelector(btnSelector);

        if (!button)
            throw new Error(
                `formHandler: No submit button exist with this selector: ${btnSelector}`
            );

        if (disabled) button.setAttribute('disabled', String(true));
        else button.removeAttribute('disabled');
    };

    // if no error occurred append inputs data to FormData and return true
    const isFormValuesValid = (): boolean => {
        const inputValues: Array<Array<any>> = Object.entries(form);
        const errArray: boolean[] = [];

        inputValues.forEach(([_, element]: FormElements, index) => {
            if (!expectedInputElements.some((v) => v === element.tagName) || !element.name)
                return;

            let nextElement  = element.nextElementSibling;
            let isErrElement = element.nextElementSibling?.classList.contains('err');
            const currentValidationSchema = validationSchema?.[element?.name];

            if(!isErrElement) {
                const errNode = document.createElement('p');
                errNode.classList.add('err');
                form.insertBefore(errNode, nextElement);

                nextElement  = errNode;
                isErrElement = true;
            } else {
                nextElement.innerHTML = '';
            }

            try {
                currentValidationSchema?.validateSync(element?.value);
                errArray[index] = false;
                data.append(
                    element?.name,
                    element?.files?.length >= 1
                        ? element?.files[0]
                        : element?.value.trim()
                );

                if (isErrElement) nextElement.innerHTML = '';
            }
            catch (err) {
                errArray[index] = true;

                disableSubmitBtn(false);
                onError(`${element?.name}: ${err?.errors?.[0]}`);

                if (isErrElement) nextElement.innerHTML = err?.errors?.[0];
            }
        });

        const isValid = errArray.every((v) => v === false);

        return isValid;
    };

    const send: T_Send = async (e, method = 'post') => {
        e.preventDefault();

        form = e.target as HTMLFormElement;
        data = new FormData();

        disableSubmitBtn();

        if (e.type !== 'submit') return;

        const _isFormValuesValid = isFormValuesValid();

        if (!(await onSubmit(data, e))) {
            disableSubmitBtn(false);
        }

        if(offlineMode.isOfflineMode) {
            onFailure('offlineMode is turned on.', data);
            if(resetForm) form.reset()
            return;
        }

        if (_isFormValuesValid) {
            await _axios?.[method](
                endPoint,
                data
            )
                .then((res) => {
                    onSuccess(res)
                    if(resetForm) form.reset()
                })
                .catch((err) => {
                    // add response error to last p.err element in form
                    //@ts-ignore
                    const allErr = form.querySelectorAll('p.err');

                    const data = err.response?.data;
                    allErr[allErr.length - 1].innerHTML =
                        data?.['title'] ?? data?.['errors'] ?? err.message;

                    console.log(err);

                    onFailure(err, data);
                    disableSubmitBtn(false);
                })
                .finally(() => {
                    fireDataFetchedEvent();
                })
        }
        else disableSubmitBtn(false);
    }

    return { send };
}

export default formHandler;
