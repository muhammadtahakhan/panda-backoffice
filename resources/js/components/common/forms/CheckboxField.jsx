import Label from './Label'
import React from 'react'
import classNames from 'classnames'

export default function CheckboxField({ name, label, value, className, onChange, ...props }) {

    return (
        <div className={
            classNames(className || 'w-full')
        }>
            <Label id={ name }>
                <div className={ classNames({
                    'w-12 h-6 rounded-full relative flex items-center transition-all duration-200': true,
                    'bg-orange-300': value,
                    'bg-stone-200': !value,
                })}>
                    <div className={ classNames({
                        'w-6 h-6 bg-white rounded-full absolute top-0 transition-all duration-200 shadow': true,
                        'left-0': !value,
                        'right-0 l-auto': value,
                    })}></div>
                </div>
                <input 
                    className="mr-2 hidden"
                    id={ name }
                    type="checkbox"
                    name={ name }
                    checked={ value }
                    onChange={ e => onChange(e.target.checked) }
                />
                { label }
            </Label>
        </div>
    )
}