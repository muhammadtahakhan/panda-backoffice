import React, {useRef, useState} from 'react'


import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import classNames from 'classnames'

// ---------------------Prime React
import {Button} from 'primereact/button';
import { Toast } from 'primereact/toast';
import { fetchPartners, hideForm } from '../../redux/partnerSlice';

export default function PartnerFrom() {
    const dispatch = useDispatch();
    const { selectedPartner } = useSelector( (state) => state.partners );


    const toastBR = useRef(null);
    const [loading, setLoading] = useState(false);
    const form = useForm({
        defaultValues: selectedPartner
      });
    const {register, handleSubmit, formState, setError} = form;
    const {errors} = formState;

    const showMessage = (message) => {
        toastBR.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    };


    const onSubmitForm = (data) => {
        setLoading(true);
        let _url = selectedPartner.id?`/api/partner/${selectedPartner.id}`:`/api/partner`;
        (selectedPartner.id ? window.axios.patch: window.axios.post)(_url,data).then(response => {
            dispatch(fetchPartners());
            setLoading(false);
            dispatch(hideForm())
        }).catch(error => {
            setLoading(false);
            // console.log("==> ", error.response.data.message)
            // console.log("==> ", error.response.data.errors)
            showMessage(error.response.data.message);
            Object.keys(error.response.data.errors).forEach(errorKey => {
                // console.log("field ==> ", errorKey)
                // console.log("field ==> ", error.response.data.errors[errorKey][0])

                setError(errorKey, { type: 'server', message: error.response.data.errors[errorKey][0] });
            });
        })
    }


    return ( <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-full max-w-lg"
        noValidate>
                        <Toast ref={toastBR} position="top-right" />

        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name">
                     Name
                </label>
                <input
                    {...register('name', {required:{value:true, message:"name is required"}})}
                    className={classNames("appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 " +
                        "mb-3 leading-tight focus:outline-none focus:bg-white", {
                    'border-red-500': errors.name?.message
                  })}
                    id="grid-first-name"
                    type="text"
                    placeholder=""/>
                <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name">
                     Name in Urdu
                </label>
                <input
                    {...register('name_urdu', {required:{value:true, message:"name in urdu is required"}})}
                    className={classNames("appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500", {'border-red-500':errors.name_urdu?.message})}
                    id="grid-last-name"
                    type="text"
                    placeholder=""/>
                    <p className="text-red-500 text-xs italic">{errors.name_urdu?.message}</p>
            </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-city">
                    Phone
                </label>
                <input
                    {...register('phone', {required:{value:true, message:"code is required"}})}
                    className={classNames("appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500", {'border-red-500':errors.phone?.message})}
                    id="grid-city"
                    type="text"
                    placeholder=""/>
                     <p className="text-red-500 text-xs italic">{errors.phone?.message}</p>

            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-city">
                    Address
                </label>
                <input
                    {...register('address', {required:{value:true, message:"costing is required"}})}
                    className={classNames("appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500", {'border-red-500':errors.address?.message})}
                    id="grid-city"
                    type="text"
                    placeholder=""/>
                     <p className="text-red-500 text-xs italic">{errors.address?.message}</p>
            </div>


        </div>

        <div className="container py-4 px-4 mx-0 min-w-full flex flex-col items-center">

            <Button label="Submit" icon="pi pi-check" loading={loading}/>

        </div>

    </form>
    )
}
