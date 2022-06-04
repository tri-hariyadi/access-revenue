import React from 'react';
import { CustomInput, FormFeedback, FormGroup } from 'reactstrap';

const Checkbox = React.memo(({
  id,
  name,
  label,
  required,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  eventChange
}) => {
  return (
    <FormGroup>
      <CustomInput
        type='checkbox'
        id={id}
        label={label}
        required={required}
        valid={!errors[name] && values[name] ? true : false}
        invalid={touched[name] && !!errors[name] ? true : false}
        onChange={e => {
          handleChange(e);
          if (eventChange) eventChange(e)
        }}
        onBlur={handleBlur} >
        <FormFeedback>{errors[name]}</FormFeedback>
      </CustomInput>
    </FormGroup>
  )
})

export default Checkbox
