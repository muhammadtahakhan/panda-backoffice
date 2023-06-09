import React, { useEffect, useRef, useState } from 'react'
import { useFieldArray, useForm , Controller} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import classNames from 'classnames'
import {Button} from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Editor } from "primereact/editor";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import moment from 'moment';

// ==========================Dev Dependicies
import { DevTool } from "@hookform/devtools";
import { fetchSaleOrders, hideForm } from '../../redux/saleOrderSlice';


 function SaleForm() {
    const { listingData: partnersListing} = useSelector(state => state.partners);
    const { products: productListing} = useSelector(state => state.products);

    const dispatch = useDispatch();
    const toastBR = useRef(null);
    const [loading, setLoading] = useState(false);
    const  form = useForm();
    const {control, register, handleSubmit, formState, setError, setValue} = form;
    const {errors} = formState;


    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "items", // unique name for your Field Array
    });

    useEffect(()=>{ append({})}, [])

    const setUnitPrice = (product_id, index)=>{
        let sale_price = productListing.filter(i=>i.id ==product_id )[0]['sale_price'];
        setValue(`items.${index}.unit_price`, sale_price);
    }


    const showMessage = (message) => {
        toastBR.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    };


    const onSubmitForm = (data) => {
        data.order_date =  moment(data.order_date).format('YYYY-MM-DD');
        console.log("Form submited", data)
        setLoading(true);
        window.axios.post('/api/sale_order',data).then(response => {
            console.log("==>");
            dispatch(fetchSaleOrders());
            setLoading(false);
            dispatch(hideForm())
        }).catch(error => {
            setLoading(false);
            console.log("==> ", error.response.data.message)
            console.log("==> ", error.response.data.errors)
            showMessage(error.response.data.message);
            Object.keys(error.response.data.errors).forEach(errorKey => {
                console.log("field ==> ", errorKey)
                console.log("field ==> ", error.response.data.errors[errorKey][0])
                if(errorKey != 'items')
                setError(errorKey, { type: 'server', message: error.response.data.errors[errorKey][0] });
            });
        })
    }


    const renderEditporHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    };

    const headerEditor = renderEditporHeader();


  return (
    <>
    <form
    onSubmit={handleSubmit(onSubmitForm)}
    className="w-full "
    noValidate>
                    <Toast ref={toastBR} position="top-right" />

    <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name">
                 Customer
            </label>
            <Controller
                    name="partner_id"
                    control={control}
                    rules={{ required: 'Customer is required.' }}
                    render={({ field, fieldState }) => (
                            <Dropdown
                            filter
                                id={field.name}
                                value={field.value}
                                optionLabel="name"
                                optionValue='id'
                                placeholder="Select a Customer"
                                options={partnersListing}
                                focusInputRef={field.ref}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames('w-full', { 'p-invalid': fieldState.error })}
                            />
                    )}
                />


            {/* <Dropdown  {...register('partner_id', {required:{value:true, message:"Customer is required"}})}
             filter options={partnersListing}
                optionLabel="name"
                optionValue='id'
                placeholder="Select Customer" className="w-full md:w-14rem" /> */}

            <p className="text-red-500 text-xs italic">{errors.partner_id?.message}</p>
        </div>

        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name">
                 Order Date
            </label>
            <Calendar dateFormat="yy-mm-dd"  {...register('order_date')}
                className={classNames(" w-full  " +
                    "mb-3 leading-tight focus:outline-none focus:bg-white", {
                'p-invalid': errors.order_date?.message
              })}  />

            <p className="text-red-500 text-xs italic">{errors.order_date?.message}</p>
        </div>

    </div>

              <div className='border rounded py-2 px-2 my-4'>
    {fields.map((field, index) => (

    <div key={field.id} className="flex flex-wrap -mx-3 mb-2">


        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city">
            Product
            </label>
            <Controller
                    name={`items.${index}.product_id`}
                    control={control}
                    rules={{ required: 'product is required.' }}
                    render={({ field, fieldState }) => (
                            <Dropdown
                            filter
                                id={field.name}
                                value={field.value}
                                optionLabel="name"
                                optionValue='id'
                                placeholder="Select a Customer"
                                options={productListing}
                                focusInputRef={field.ref}
                                onChange={(e) => { setUnitPrice(e.value, index); field.onChange(e.value)}}
                                className={classNames('w-full ', { 'p-invalid': errors.items?.[index]?.product_id?.message })}
                            />
                    )}
                />

                <p className="text-red-500 text-xs italic">{errors.items?.[index]?.product_id?.message}</p>


        </div>

        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city">
            Quantity
            </label>
            <input
                    {...register(`items.${index}.quantity`, {required:{value:true, message:"quantity is required"}})}
                    className={classNames("appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 " +
                        "mb-3 leading-tight focus:outline-none focus:bg-white", {
                    'border-red-500': errors.items?.[index]?.quantity?.message
                  })}
                    id="grid-first-name"
                    type="text"
                    placeholder=""/>
                    <p className="text-red-500 text-xs italic">{errors.items?.[index]?.quantity?.message}</p>


        </div>

        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city">
           Unit Price
            </label>
            <input
                    {...register(`items.${index}.unit_price`, {required:{value:true, message:"price is required"}})}
                    className={classNames("appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 " +
                        "mb-3 leading-tight focus:outline-none focus:bg-white", {
                    'border-red-500': errors.items?.[index]?.unit_price?.message
                  })}
                    id="grid-first-name"
                    type="text"
                    placeholder=""/>
                    <p className="text-red-500 text-xs italic">{errors.items?.[index]?.unit_price?.message}</p>



        </div>
        {index > 0 &&
            <div className="w-full md:w-1/12 px-3 mb-6 md:mb-0 ">
                <i onClick={()=>{ remove(index); }} className="pi pi-times py-7 text-red-600"></i>
            </div>
        }


                  <hr />
    </div>


    ))}

        <Button type='button' label="Add Product" onClick={()=>{append({});}}/>

</div>



    <div className="flex flex-wrap -mx-3 mb-2">


        <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
            <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city">
               Sale Comment
            </label>


            <Controller
                    name="comment"
                    control={control}
                    render={({ field, fieldState }) => (

                            <Editor

                            id={field.name}
                            name="comment"
                            headerTemplate={headerEditor}
                            // focusInputRef={field.ref}
                            onTextChange={(e) => { field.onChange(e.textValue)}}
                            style={{ height: '220px' }}
                            value={field.value}
                            />
                    )}
                />


                 <p className="text-red-500 text-xs italic">{errors.comment?.message}</p>
        </div>


    </div>

    <div className="container py-4 px-4 mx-0 min-w-full flex flex-col items-center">



        <Button type='submit' label="Submit" icon="pi pi-check" loading={loading}/>

    </div>

</form>
<DevTool control={control} /> {/* set up the dev tool */}
</>
  )
}
export default SaleForm
