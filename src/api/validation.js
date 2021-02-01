import {useState, useEffect} from "react";

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        setDirty(true)
    }

    return {
        value,
        onBlur,
        onChange,
        isDirty,
        ...valid
    }
}

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [emailError, setEmailError] = useState(false)
    const [minLength, setMinLengthError] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case  'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'emailError':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break
                default:
            }
        }
    }, [value, validations])

    useEffect(() => {
        if (isEmpty || emailError || minLength) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, emailError, minLength])

    return {
        isEmpty,
        minLength,
        emailError,
        inputValid
    }
}