import Validator from 'validator';
import isEmpty from 'lodash/isEmpty'

export default function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.name)) {
        errors.name = 'This field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'This field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'This field is required';
    }

    if (Validator.isEmpty(data.password_confirmation)) {
        errors.password_confirmation = 'This field is required';
    }

    if (!Validator.equals(data.password, data.password_confirmation)) {
        errors.password_confirmation = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}