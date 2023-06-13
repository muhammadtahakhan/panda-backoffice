import React, {useRef, useState} from 'react'


import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import classNames from 'classnames'

// ---------------------Prime React
import {Button} from 'primereact/button';
import { Toast } from 'primereact/toast';
import { fetchPartners, hideForm } from '../../redux/partnerSlice';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';

export default function MakePartnerPayment({partner, setPaymentFormVis}) {
    const dispatch = useDispatch();


    const toastBR = useRef(null);
    const [loading, setLoading] = useState(false);
    const form = useForm(
        { defaultValues: {partner_id:partner.id}}
    );
    const {register, handleSubmit, formState, setError} = form;
    const {errors} = formState;

    const showMessage = (message) => {
        toastBR.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    };


    const onSubmitForm = (data) => {
        setLoading(true);
        data.payment_date = moment(data.payment_date).format("YYYY-MM-DD");

             window.axios.post(`/api/receive_payment`,data).then(response => {
            dispatch(fetchPartners());
            setLoading(false);

            setPaymentFormVis(false)
        }).catch(error => {
            setLoading(false);
            // console.log("==> ", error.response.data.message)
            // console.log("==> ", error.response.data.errors)
            showMessage(error.response.data.message||'');
            Object.keys(error.response.data.errors).forEach(errorKey => {
                // console.log("field ==> ", errorKey)
                // console.log("field ==> ", error.response.data.errors[errorKey][0])

                setError(errorKey, { type: 'server', message: error.response.data.errors[errorKey][0] });
            });
        })
    }


    return ( <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-full "
        noValidate>
                        <Toast ref={toastBR} position="top-right" />
                        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
               <h1>Payment From: {partner?.name} / {partner?.name_urdu}</h1>
                </div>
            </div>

        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name">
                     Amount
                </label>
                <input
                    {...register('amount', {required:{value:true, message:"amount is required"}})}
                    className={classNames("appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 " +
                        "mb-3 leading-tight focus:outline-none focus:bg-white", {
                    'border-red-500': errors.amount?.message
                  })}
                    id="grid-first-name"
                    type="text"
                    placeholder=""/>
                <p className="text-red-500 text-xs italic">{errors.amount?.message}</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name">
                     Date
                </label>
                <Calendar
                            dateFormat="yy-mm-dd"
                            {...register("payment_date")}
                            className={classNames(
                                " w-full  " +
                                    "mb-3 leading-tight focus:outline-none focus:bg-white",
                                {
                                    "p-invalid": errors.payment_date?.message,
                                }
                            )}
                        />
                    <p className="text-red-500 text-xs italic">{errors.payment_date?.message}</p>
            </div>
        </div>


        <div className="container py-4 px-4 mx-0 min-w-full flex flex-col items-center">

            <Button label="Submit" icon="pi pi-check" loading={loading}/>

        </div>

    </form>
    )
}
