import DefaultContainer from '../../components/common/layout/DefaultContainer'
import PageTitle from '../../components/common/typography/PageTitle'
import React, { useState } from 'react'
import SiteTitle from '../../components/global/SiteTitle'

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';


export default function Products() {
    const [customers, setCustomers] = useState([
        {'name':"taha", country:{name:"pakistan"}, company:"ICC", representative:{name:"khan representative"}}
    ]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-plus" label="Add Product" outlined  />
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

            <div className="bg-white border border-gray-200 rounded-lg shadow h-max px-2 py-2">
            <DataTable header={header} value={customers} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
                <Column field="company" header="Company" style={{ width: '25%' }}></Column>
                <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
        </>
    )
}
