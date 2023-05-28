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


export default function Products() {
    const dispatch = useDispatch();
    const { products, isLoading, formVisibility } = useSelector(state => state.products);
    const [FormVisibility, setFormVisibility] = useState(false);


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
                <DataTable header={header} value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                    <Column field="name_urdu" header="Country" style={{ width: '25%' }}></Column>
                    <Column field="code" header="Company" style={{ width: '25%' }}></Column>
                    <Column field="cost_price" header="Representative" style={{ width: '25%' }}></Column>
                    <Column field="sale_price" header="Representative" style={{ width: '25%' }}></Column>
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
