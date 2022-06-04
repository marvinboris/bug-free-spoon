import React, { useState } from 'react';
import { FormGroup, Input, InputGroup, InputGroupText, InputGroupAddon, CustomInput, Label } from 'reactstrap';

import WithTooltip from '../WithTooltip/WithTooltip';

import { checkValidity } from '../../../shared/utility';

import './Input.scss';

export default ({ id, onChange, size = '', className = '', name, type = 'text', required, readonly, disabled, placeholder, label, value = undefined, defaultValue = undefined, validation = {}, children, bonus, icon, addon, append }) => {
    const [touched, setTouched] = useState(false);

    const inputChangedHandler = e => {
        setTouched(true);
        onChange(e);
    }

    if (required) validation.required = true;

    const valid = touched && !!value && checkValidity(value, validation),
        invalid = touched && !checkValidity(value, validation);

    const data = {
        name, valid, invalid, type, required, disabled, defaultValue, value: !value ? '' : value, placeholder,
        onChange: inputChangedHandler,
        id: id ? id : name,
        readOnly: readonly,
    };

    const content = <InputGroup>
        {(icon || addon) && <InputGroupAddon addonType="prepend">
            <InputGroupText>
                {icon ? <div className='icon'>
                    <i className={`fas fa-${icon} fa-fw`} />
                </div> : <div className='addon'>{addon}</div>}

                <div className='circle' />
            </InputGroupText>
        </InputGroupAddon>}

        {children ? <CustomInput {...data}>{children}</CustomInput> : <Input {...data} />}

        {append && <InputGroupAddon addonType="append">
            <InputGroupText>
                {append}
            </InputGroupText>
        </InputGroupAddon>}
    </InputGroup>;

    return <FormGroup className={`UI Input ${size}${(readonly || disabled) ? ' inactive ' : ' '}${className}`}>
        {label ? <>
            <label className='control-label'>{label}</label>
            {content}
        </> : <WithTooltip content={<>{placeholder}{required && <span className="text-red">*</span>}</>} id={data.id}>
            {content}
        </WithTooltip>}

        {bonus}
    </FormGroup>;
};