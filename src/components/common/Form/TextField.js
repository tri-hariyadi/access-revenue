import React from 'react';
import propTypes from 'prop-types';
import { FormFeedback, FormGroup, Label, Input } from 'reactstrap';
import { compare } from '../../../configs';

const TextField = ({
  id,
  name,
  placeholder,
  autoComplete,
  label,
  type,
  required,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  eventChange,
  hideLabel,
  minLength,
  maxLength,
  textTransform,
  style,
  onKeyDown,
  disabled,
  format,
  secureTextEntry
}) => {
  const [secure, setSecure] = React.useState(secureTextEntry);
  return (
    <FormGroup style={secureTextEntry ? { position: 'relative' } : {}}>
      {label && <Label style={hideLabel ? { visibility: 'hidden' } : {}} for={id} className='text-filed-label'>{label}</Label>}
      <Input
        type={type}
        name={name}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        valid={!errors[name] && values[name] ? true : false}
        invalid={touched[name] && !!errors[name] ? true : false}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        onChange={(e) => {
          handleChange(e);
          if (eventChange) eventChange(e);
        }}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        value={!textTransform ? `${values[name].charAt(0).toUpperCase()}${values[name].slice(1)}` : format ? format(values[name]) : values[name]}
        style={Object.assign({}, textTransform ? { textTransform: textTransform } : {}, style)}
        className='text-field' />
      {secureTextEntry && <i
        className={[secure ? 'fa fa-eye-slash' : 'fa fa-eye', 'toggle-pass'].join(' ')}
        onClick={() => {
          setSecure(v => !v)
          const x = document.getElementById('password');
          x.type = x.type === 'password' ? 'text' : 'password';
        }} />}
      <FormFeedback>{errors[name]}</FormFeedback>
    </FormGroup>
  )
}

TextField.propTypes = {
  type: propTypes.string,
  name: propTypes.string,
  id: propTypes.string,
  placeholder: propTypes.string,
  autoComplete: propTypes.string,
  minLength: propTypes.oneOfType([propTypes.string, propTypes.number]),
  maxLength: propTypes.oneOfType([propTypes.string, propTypes.number]),
  eventChange: propTypes.func,
  textTransform: propTypes.oneOf(['none', 'capitalize', 'lowercase', 'uppercase']),
  hideLabel: propTypes.bool,
  label: propTypes.string,
  style: propTypes.object,
  disabled: propTypes.bool
}

export default React.memo(TextField, compare);
