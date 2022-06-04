import React from 'react';
import propTypes from 'prop-types';
import { Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Button = props => {
  const history = useHistory();
  const className = [props.className, 'ripple'];
  if (props.isPrimary) className.push('btn btn-primary');
  if (props.isSecondary) className.push('btn btn-secondary');
  if (props.isSuccess) className.push('btn btn-success');
  if (props.isDanger) className.push('btn btn-danger');
  if (props.isWarning) className.push('btn btn-warning');
  if (props.isInfo) className.push('btn btn-info');
  if (props.isLight) className.push('btn btn-light');
  if (props.isDark) className.push('btn btn-dark');
  if (props.isLarge) className.push('btn-lg');
  if (props.isSmall) className.push('btn-sm');
  if (props.isBlock) className.push('btn-block');
  if (props.type === 'link') className.push('text-decoration-none');
  if (props.hasShadow) className.push('btn-shadow')
  if (props.isBtnLink) {
    className.push('btn btn-link');
    className.forEach((item, idx) => {
      if (item && item.includes('decoration'))
        delete className[idx];
    });
  }

  const onClick = e => {
    if (props.type !== 'submit') e.preventDefault();
    e.persist();
    setTimeout(() => {
      if (props.onClick) props.onClick(e);
      if (props.type === 'link') history.push({
        pathname: props.href,
        state: props.state
      });
    }, 100);
  };

  if (props.isDisabled || props.isLoading) {
    className.push('disabled');
    className.forEach((i, idx) => {
      if (i === 'ripple') className.splice(idx, 1);
    })
    return (
      <span id={props.id} className={className.join(' ')} style={props.style}>
        {props.isLoading ? (
          <span className='d-flex align-items-center justify-content-center'>
            {props.isLarge ?
              <Spinner color='light' style={{ width: '1.5rem', height: '1.5rem' }} className='mr-2' />
              :
              <Spinner color='light' size='sm' className='mr-2' />
            }
            {props.textLoading !== null && <span className='mt-0'>{props.textLoading ? props.textLoading : 'Loading...'}</span>}
          </span>
        ) : (
          <span className='d-flex align-items-center justify-content-center'>
            {props.icon && <i className={props.icon} />}{props.children}
          </span>
        )}
      </span>
    );
  }

  if (props.type === 'link') {
    if (props.isExternal) {
      return (
        <a
          id={props.id}
          href={props.href}
          className={className.join(' ')}
          style={props.style}
          target={props.target === '_blank' ? '_blank' : undefined}
          rel={props.target === '_blank' ? 'noopener noreferrer' : undefined}
        >
          {props.icon && <i className={props.icon} />}{props.children}
        </a>
      );
    } else {
      return (
        <button
          id={props.id}
          type={props.type}
          className={className.join(' ')}
          style={props.style}
          onClick={onClick}
        >
          {props.icon && <i className={props.icon} />}{props.children}
        </button>
      );
    }
  }

  return (
    <button
      id={props.id}
      type={props.type}
      value={props.value}
      className={className.join(' ')}
      style={props.style}
      onMouseEnter={props.onMouseEnter}
      onClick={onClick}>
      {props.icon && <i className={props.icon} />}{props.children}
    </button>
  )
}

Button.propTypes = {
  id: propTypes.string,
  type: propTypes.oneOf(['button', 'link', 'submit']),
  onClick: propTypes.func,
  onMouseEnter: propTypes.func,
  href: propTypes.string,
  target: propTypes.string,
  className: propTypes.string,
  isPrimary: propTypes.bool,
  isLight: propTypes.bool,
  isSecondary: propTypes.bool,
  isSuccess: propTypes.bool,
  isDanger: propTypes.bool,
  isWarning: propTypes.bool,
  isInfo: propTypes.bool,
  isDark: propTypes.bool,
  isBtnLink: propTypes.bool,
  isExternal: propTypes.bool,
  isDisabled: propTypes.bool,
  isLoading: propTypes.bool,
  isSmall: propTypes.bool,
  isLarge: propTypes.bool,
  isBlock: propTypes.bool,
  hasShadow: propTypes.bool,
  style: propTypes.object,
  textLoading: propTypes.string
}

export default Button
