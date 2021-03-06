import { useState, createContext } from "react"
import * as WebAPI from "../../api"
import { WebAPIUnavailableResponse, UnexpectedResponseError } from "../../api/classes"

export const useSignupFormState = () => {
    const initialState = {
        errorMessage: [],
        hint: [],
        value: "",
    }
    const [nameField, setNameField] = useState(initialState)
    const [passwordField, setPasswordField] = useState(initialState)
    const [confirmedPasswordField, setConfirmedPasswordField] = useState(initialState)
    const [globalErrorMessageField, setGlobalErrorMessageField] = useState({
        errorMessage: [],
        hint: [],
    })
    const [termsOfServiceAgreementField, setTermsOfServiceAgreementField] = useState({
        errorMessage: [],
        hint: [],
        checked: false,
    })

    const handleUpdateNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameField({
            errorMessage: nameField.errorMessage,
            hint: nameField.hint,
            value: event.target.value,
        })
    }

    const handleUpdatePasswordValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordField({
            errorMessage: passwordField.errorMessage,
            hint: passwordField.hint,
            value: event.target.value,
        })
    }

    const handleUpdateConfirmedPasswordValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmedPasswordField({
            errorMessage: confirmedPasswordField.errorMessage,
            hint: confirmedPasswordField.hint,
            value: event.target.value,
        })
    }

    const handleTermsOfServiceAgreementChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTermsOfServiceAgreementField({
            errorMessage: termsOfServiceAgreementField.errorMessage,
            hint: termsOfServiceAgreementField.hint,
            checked: event.target.checked,
        })
    }

    const signup = async () => {
        if (termsOfServiceAgreementField.checked !== true) {
            return new WebAPI.Response({
                ok: false,
                error_code: "you_must_agree_to_terms_of_service",
                description: ["利用規約をお読みください"],
                hint: ["同意する場合はチェックボックスにチェックを入れてください"],
            })
        }
        try {
            return await WebAPI.account.signup({
                name: nameField.value,
                password: passwordField.value,
                confirmedPassword: confirmedPasswordField.value,
            })
        } catch (error) {
            if (error instanceof UnexpectedResponseError) {
                throw error
            }
            return new WebAPI.Response(WebAPIUnavailableResponse)
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await signup()
        if (response.ok) {
            setGlobalErrorMessageField({
                errorMessage: [],
                hint: [],
            })
            setNameField({
                errorMessage: [],
                hint: [],
                value: nameField.value,
            })
            setPasswordField({
                errorMessage: [],
                hint: [],
                value: passwordField.value,
            })
            setConfirmedPasswordField({
                errorMessage: [],
                hint: [],
                value: confirmedPasswordField.value,
            })
            setTermsOfServiceAgreementField({
                errorMessage: [],
                hint: [],
                checked: true,
            })
            location.href = "/welcome"
        } else {
            handleError(response)
        }
    }

    const handleError = (response: WebAPI.Response) => {
        if (response.argument === "name") {
            setGlobalErrorMessageField({
                errorMessage: [],
                hint: [],
            })
            setPasswordField({
                errorMessage: [],
                hint: [],
                value: passwordField.value,
            })
            setConfirmedPasswordField({
                errorMessage: [],
                hint: [],
                value: confirmedPasswordField.value,
            })
            setNameField({
                errorMessage: response.getErrorMessage(),
                hint: response.getHint(),
                value: nameField.value,
            })
            setTermsOfServiceAgreementField({
                errorMessage: [],
                hint: [],
                checked: termsOfServiceAgreementField.checked,
            })
            return
        }
        if (response.argument === "password") {
            setGlobalErrorMessageField({
                errorMessage: [],
                hint: [],
            })
            setNameField({
                errorMessage: [],
                hint: [],
                value: nameField.value,
            })
            setConfirmedPasswordField({
                errorMessage: [],
                hint: [],
                value: confirmedPasswordField.value,
            })
            setPasswordField({
                errorMessage: response.getErrorMessage(),
                hint: response.getHint(),
                value: passwordField.value,
            })
            setTermsOfServiceAgreementField({
                errorMessage: [],
                hint: [],
                checked: termsOfServiceAgreementField.checked,
            })
            return
        }
        if (response.argument === "confirmed_password") {
            setGlobalErrorMessageField({
                errorMessage: [],
                hint: [],
            })
            setNameField({
                errorMessage: [],
                hint: [],
                value: nameField.value,
            })
            setPasswordField({
                errorMessage: [],
                hint: [],
                value: passwordField.value,
            })
            setConfirmedPasswordField({
                errorMessage: response.getErrorMessage(),
                hint: response.getHint(),
                value: confirmedPasswordField.value,
            })
            setTermsOfServiceAgreementField({
                errorMessage: [],
                hint: [],
                checked: termsOfServiceAgreementField.checked,
            })
            return
        }
        if (response.getErrorCode() === "name_taken") {
            setGlobalErrorMessageField({
                errorMessage: [],
                hint: [],
            })
            setPasswordField({
                errorMessage: [],
                hint: [],
                value: passwordField.value,
            })
            setConfirmedPasswordField({
                errorMessage: [],
                hint: [],
                value: confirmedPasswordField.value,
            })
            setNameField({
                errorMessage: response.getErrorMessage(),
                hint: response.getHint(),
                value: nameField.value,
            })
            setTermsOfServiceAgreementField({
                errorMessage: [],
                hint: [],
                checked: termsOfServiceAgreementField.checked,
            })
            return
        }
        if (response.getErrorCode() === "you_must_agree_to_terms_of_service") {
            setGlobalErrorMessageField({
                errorMessage: [],
                hint: [],
            })
            setPasswordField({
                errorMessage: [],
                hint: [],
                value: passwordField.value,
            })
            setConfirmedPasswordField({
                errorMessage: [],
                hint: [],
                value: confirmedPasswordField.value,
            })
            setNameField({
                errorMessage: [],
                hint: [],
                value: nameField.value,
            })
            setTermsOfServiceAgreementField({
                errorMessage: response.getErrorMessage(),
                hint: response.getHint(),
                checked: false,
            })
            return
        }

        // その他のエラーは入力内容と無関係
        setPasswordField({
            errorMessage: [],
            hint: [],
            value: passwordField.value,
        })
        setConfirmedPasswordField({
            errorMessage: [],
            hint: [],
            value: confirmedPasswordField.value,
        })
        setNameField({
            errorMessage: [],
            hint: [],
            value: nameField.value,
        })
        setGlobalErrorMessageField({
            errorMessage: response.getErrorMessage(),
            hint: response.getHint(),
        })
        setTermsOfServiceAgreementField({
            errorMessage: [],
            hint: [],
            checked: termsOfServiceAgreementField.checked,
        })
    }

    return {
        nameField,
        passwordField,
        confirmedPasswordField,
        globalErrorMessageField,
        termsOfServiceAgreementField,
        handleUpdateNameValue,
        handleUpdatePasswordValue,
        handleUpdateConfirmedPasswordValue,
        handleTermsOfServiceAgreementChecked,
        handleSubmit,
    }
}

const context = {
    nameField: {
        errorMessage: [],
        hint: [],
        value: "",
    },
    passwordField: {
        errorMessage: [],
        hint: [],
        value: "",
    },
    confirmedPasswordField: {
        errorMessage: [],
        hint: [],
        value: "",
    },
    globalErrorMessageField: {
        errorMessage: [],
        hint: [],
    },
    termsOfServiceAgreementField: {
        errorMessage: [],
        hint: [],
        checked: false,
    },
    handleUpdateNameValue: null,
    handleUpdatePasswordValue: null,
    handleUpdateConfirmedPasswordValue: null,
    handleTermsOfServiceAgreementChecked: null,
}

export const SignupFormContext = createContext(context)
