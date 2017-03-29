import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ field, value, placeholder, error, type, onChange }) => {
    return (
        <div className={classnames("form-group", { 'has-error': error })}>
            <input
                onChange={onChange}
                value={value}
                type={type}
                name={field}
                className={classnames("auth__input", { 'auth__input--error': error })}
                placeholder={placeholder}
            />
            {error && <span className="help-block">{error}</span>}
        </div>
    );
}

TextFieldGroup.propTypes = {
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;