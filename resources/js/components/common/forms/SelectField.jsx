import ErrorMessages from './ErrorMessages'
import Label from './Label'
import React from 'react'
import Text from '../typography/Text'
import classNames from 'classnames'

export default function SelectField({ label, name, type, value, options, caption, beforeInput, onChange, className, errors, ...props }) {

    return (
        <div className={
            classNames(className || 'w-full')
        }>
            <Label>{ label }</Label>

            { caption && (
                <Text variant="caption" className="mb-2">{ caption }</Text>
            )}

            { beforeInput != null && (
               <div className="mb-4">{ beforeInput }</div> 
            )}

            <div className="relative w-full flex items-center">
                <select
                    className="appearance-none block w-full bg-stone-200 text-stone-700 border border-stone-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    id={ name }
                    type={ type }
                    value={ type !== 'file' ? value : null }
                    onChange={ e => onChange(e.target.value) }
                    { ...props }
                >
                    { options?.map(option => (
                        <option value={ option.value }>{ option.label }</option>
                    ))}
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-0 mr-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>

            </div>

            { errors && (
                <ErrorMessages errors={ errors } />
            )}
        </div>
    )
}