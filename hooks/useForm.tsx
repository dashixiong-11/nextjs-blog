import React, {ReactChild, useCallback, useState} from "react";
import {AxiosResponse} from "axios";


type Field<T> = {
    label: string,
    type: 'text' | 'password' | 'textarea',
    key: keyof T
}
type useFormOptions<T> = {
    initFormData: T;
    fields: Field<T>[];
    buttons: ReactChild;
    submit: {
        request: (formData: T) => Promise<AxiosResponse<T>>;
        successCallback: () => void;
    }
}

export function useForm<T>(options: useFormOptions<T>) {
    const {initFormData, fields, buttons, submit} = options;
    const [formData, setFormData] = useState(initFormData)
    const [errors, setErrors] = useState(() => {
        const e: { [key in keyof T]?: string[] } = {}
        for (let key in initFormData) {
            if (initFormData.hasOwnProperty(key)) {
                e[key] = []
            }
        }
        return e
    })
    const onChange = useCallback((key: keyof T, value: any) => {
        setFormData({...formData, [key]: value})
    }, [formData])
    const _onSubmit = useCallback((e) => {
        e.preventDefault();
        submit.request(formData).then(() => {
                submit.successCallback()
            }, (error) => {
                if (error.response) {
                    const response: AxiosResponse = error.response;
                    if (response.status === 422) {
                        setErrors(response.data);
                    } else if (response.status === 401) {
                        window.alert('请先登录')
                        window.location.href = '/sign_in?return_to=' + encodeURIComponent(window.location.pathname)
                    }
                }
            }
        );

    }, [submit, formData]);

    const form = <form onSubmit={_onSubmit}>
        {fields.map(field =>
            <div key={field.key.toString()}>
                <label>{field.label}
                    {field.type === 'textarea' ?
                        <textarea onChange={(e) => onChange(field.key, e.target.value)}
                                  value={formData[field.key].toString()}/>
                        :
                        <input type={field.type} value={formData[field.key].toString()}
                               onChange={(e) => onChange(field.key, e.target.value)}/>
                    }
                </label>
                {errors[field.key]?.length > 0 && <div>
                    {errors[field.key].join(',')}
                </div>}
            </div>
        )}
        <div>
            {buttons}
        </div>

    </form>
    return {
        form
    }

}