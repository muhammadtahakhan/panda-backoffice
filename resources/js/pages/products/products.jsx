import PageTitle from '../../components/common/typography/PageTitle'
import React, { useEffect, useState } from 'react'
import SiteTitle from '../../components/global/SiteTitle'

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Dialog } from 'primereact/dialog';
import ProductFrom from './productForm';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, showForm, hideForm } from "../../redux/productSlice";
import { ProgressSpinner } from 'primereact/progressspinner';
import classNames from 'classnames'



export default function Products() {
    const dispatch = useDispatch();
    const { products, isLoading, formVisibility } = useSelector(state => state.products);


    useEffect(() => {
           dispatch(fetchProducts());
         }, [dispatch]);


// =================================================================================Templated Start
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                {/* <Button onClick={()=>setFormVisibility(true)} type="button" icon="pi pi-plus" label="Add Product" outlined  /> */}
                <Button onClick={()=> dispatch(showForm())} type="button" icon="pi pi-plus" label="Add Product" outlined  />
                {/* <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText  placeholder="Keyword Search" />
                </span> */}
            </div>
        );
    };


    const stockBodyTemplate = (rowData) => {
        const stockClassName = classNames('border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm', {
            'bg-red-100 text-red-900 px-2': rowData.quantity === 0,
            'bg-blue-100 text-blue-900 px-2': rowData.quantity > 0 && rowData.quantity < 10,
            'bg-teal-100 text-teal-900 px-2': rowData.quantity > 10
        });

        return <div className={stockClassName}>{rowData.quantity}</div>;
    };

    const header = renderHeader();
    return (
        <>
            <SiteTitle>Products</SiteTitle>

            <PageTitle>Products Listing</PageTitle>
            {isLoading &&
             <div lass="fixed top-0 left-0 z-50 flex items-center justify-center">
             <div className=" rounded-lg flex items-center flex-col">
             <ProgressSpinner />
             </div>
             </div>}


            <div className="bg-white border border-gray-200 rounded-lg shadow h-max px-2 py-2">
                <DataTable header={header} value={products} paginator rows={3} rowsPerPageOptions={[3, 5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                    <Column field="name_urdu" header="Name in Urdu" style={{ width: '25%' }}></Column>
                    <Column field="code" header="Product Code" style={{ width: '25%' }}></Column>
                    <Column field="cost_price" header="Cost Price" style={{ width: '25%' }}></Column>
                    <Column field="sale_price" header="Sale Price" style={{ width: '25%' }}></Column>
                    <Column field="quantity" header="Quantity" body={stockBodyTemplate}></Column>

                </DataTable>
            </div>

        {/* ======================================Overlay From Start=========================================== */}
        <div className="card flex justify-content-center">
            <Dialog position={'right'} header="Header" visible={formVisibility} onHide={() => dispatch(hideForm())}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                    <ProductFrom/>

            </Dialog>
        </div>
        {/* ======================================Overlay From Ends=========================================== */}
        </>
    )
}
