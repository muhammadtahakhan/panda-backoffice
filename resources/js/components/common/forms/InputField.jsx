import ErrorMessages from '../forms/ErrorMessages'
import Label from './Label'
import React from 'react'
import Text from '../typography/Text'
import classNames from 'classnames'

export default function InputField({ label, name, type, value, caption, beforeInput, onChange, className, errors, ...props }) {

    return (
        <div className={
            classNames(className || 'w-full')
        }>
            <Label id="name">{ label }</Label>

            { beforeInput != null && (
               <div className="mb-4">{ beforeInput }</div> 
            )}

            { type === 'textarea' ? (
                <textarea 
                    className={ classNames('appearance-none block w-full bg-white text-stone-700 border border-stone-200 rounded py-3 px-4 leading-tight focus:outline-none', {
                        'border-red-500': errors,
                    }) }
                    id={ name }
                    type={ type }
                    value={ type !== 'file' ? (value || '') : '' }
                    onChange={ e => {
                        if (type === 'file') {
                            onChange(e.target.files)
                        } else {
                            onChange(e.target.value)
                        }
                    } }
                    { ...props }
                />
            ) : (
                <input
                    className="appearance-none block w-full bg-white text-stone-700 border border-stone-200 rounded py-3 px-4 leading-tight focus:outline-none "
                    id={ name }
                    type={ type }
                    value={ type !== 'file' ? value : null }
                    onChange={ e => {
                        if (type === 'file') {
                            onChange(e.target.files)
                        } else {
                            onChange(e.target.value)
                        }
                    } }
                    { ...props }
                />
            )}

            { caption && (
                <Text variant="caption" className="mt-2">{ caption }</Text>
            )}

            { errors && (
                <ErrorMessages errors={ errors } />
            )}
        </div>
    )
}