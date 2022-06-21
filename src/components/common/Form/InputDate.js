import React, { useEffect, useRef, useState } from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';
import { DateRange } from "react-date-range";
import * as rdrLocales from 'react-date-range/dist/locale';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import iconCalendar from '../../../assets/icon-calendar.svg';

const formatDate = (date) => {
  const d = new Date(date);
  const dtf = new Intl.DateTimeFormat("id", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
  const [{ value: mo }, , { value: da }] = dtf.formatToParts(d);

  return `${da} ${mo}`;
  // return date;
};

const InputDate = ({
  value,
  placeholder,
  name,
  onChange,
  outerClassName,
  label,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setTouched,
  form,
}) => {
  const [isShowed, setIsShowed] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  
  const datePickerChange = (value) => {
    const target = {
      target: {
        value: value.selection,
        name: name,
      },
    };
    setDate(v => ({...v, ...target.target.value}))
    handleChange(target);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const refDate = useRef(null);
  const handleClickOutside = (event) => {
    if (refDate && !refDate.current.contains(event.target)) {
      setIsShowed(false);
    }
  };

  const check = (focus) => {
    focus.indexOf(1) < 0 && setIsShowed(false);
  };

  const displayDate = `${values[name].startDate ? formatDate(values[name].startDate) : ""}${
    values[name].endDate ? " - " + formatDate(values[name].endDate) : ""
  }`;
  console.log(errors);

  const isValid = touched[name] && !(errors[name] && (errors[name].startDate || errors[name].endDate));

  const inValid = touched[name] && errors[name] && (errors[name].startDate || errors[name].endDate) ? true : false;

  return (
    <div
      ref={refDate}
      className={["input-date mb-3", outerClassName].join(" ")}
    >
      {label && <Label className='text-filed-label' style={{zIndex: -1}}>{label}</Label>}
      <div className="input-group">
        <div className="input-group-prepend bg-gray-900">
          <span className="input-group-text">
            <img src={iconCalendar} alt="icon calendar" />
          </span>
        </div>
        <input
          type='text'
          name={name}
          onChange={handleChange}
          style={{ width: 0, height: 0, display: 'none' }}
        />
        <Input
          readOnly
          type="text"
          className="form-control"
          value={displayDate}
          placeholder={placeholder || label}
          valid={isValid}
          invalid={inValid}
          onClick={() => setIsShowed(!isShowed)}
          onBlur={() => setTouched({...touched, [name]: { startDate: true, endDate: true }})}
        />
        <FormFeedback>{errors[name] ? (errors[`${name}`].startDate || errors[`${name}`].endDate) : ''}</FormFeedback>

        {isShowed && (
          <div className="date-range-wrapper">
            <DateRange
              locale={rdrLocales.id}
              editableDateInputs={true}
              onChange={datePickerChange}
              moveRangeOnFirstSelection={false}
              onRangeFocusChange={check}
              ranges={[date]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(InputDate);