import DefaultContainer from "../../components/common/layout/DefaultContainer";
import PageTitle from "../../components/common/typography/PageTitle";
import React, { useEffect, useRef, useState } from "react";
import SiteTitle from "../../components/global/SiteTitle";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteSaleOrders,
    fetchSaleOrders,
    hideForm,
    showForm,
} from "../../redux/saleOrderSlice";
import SaleForm from "./saleForm";
// ==================================Prime React Imports
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";
import { TieredMenu } from "primereact/tieredmenu";
import { Paginator } from "primereact/paginator";
import classNames from "classnames";

export default function Sales() {
    const dispatch = useDispatch();
    const { listingData, isLoading, formVisibility, meta } = useSelector(
        (state) => state.saleOrders
    );
    const [selectedRow, setSelectedRow] = useState({});

    useEffect(() => {
        dispatch(fetchSaleOrders());
    }, [dispatch]);

    // =================================================================================Data Table Template
    const paginatorLeft = (
        <Button
            onClick={() => {
                dispatch(fetchSaleOrders());
            }}
            type="button"
            icon="pi pi-refresh"
            text
        />
    );
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                {/* <Button onClick={()=>setFormVisibility(true)} type="button" icon="pi pi-plus" label="Add Product" outlined  /> */}
                <Button
                    onClick={() => dispatch(showForm())}
                    type="button"
                    icon="pi pi-plus"
                    label="Add (گاہک/فروش)"
                    outlined
                />
                {/* <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText  placeholder="Keyword Search" />
                </span> */}
            </div>
        );
    };

    const stockBodyTemplate = (rowData) => {
        const stockClassName = classNames(
            "border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm",
            {
                "bg-red-100 text-red-900 px-2": rowData.quantity === 0,
                "bg-blue-100 text-blue-900 px-2":
                    rowData.quantity > 0 && rowData.quantity < 10,
                "bg-teal-100 text-teal-900 px-2": rowData.quantity > 10,
            }
        );

        return <div className={stockClassName}>{rowData.quantity}</div>;
    };

    const header = renderHeader();
    // ========================================================================Edit Buttom Template

    const menu = useRef(null);
    const items = [
        {
            label: "Show",
            icon: "pi pi-pencil",
            command: () => {
                console.log("selected", selectedRow.rowData.id);
            },
        },
        // {
        //     label: 'Update',
        //     icon: 'pi pi-refresh',
        //     command: () => {
        //         toast.current.show({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        //     }
        // },
        {
            label: "Delete",
            icon: "pi pi-trash",
            command: () => {
                console.log("selected", selectedRow.rowData.id);
                dispatch(deleteSaleOrders(selectedRow.rowData.id));
            },
        },
    ];

    const editBodyTemplate = (rowData) => {
        return (
            <>
                <TieredMenu
                    onHide={() => {
                        setSelectedRow({});
                    }}
                    model={items}
                    popup
                    ref={menu}
                    breakpoint="767px"
                />
                <i
                    className="custom-target-icon pi pi-ellipsis-v p-text-secondary p-overlay-badge"
                    onClick={(e) => {
                        setSelectedRow({ rowData });
                        menu.current.toggle(e);
                    }}
                ></i>
            </>
        );
    };

    // ======================================================Paginator Template start

    const onPageChange = (event) => {
        dispatch(fetchSaleOrders(event.page + 1, event.rows));
    };

    // ======================================================Paginator Template end

    return (
        <>
            <SiteTitle>Sales</SiteTitle>

            <PageTitle>Sales Listing</PageTitle>

            {isLoading && (
                <div lass="fixed top-0 left-0 z-50 flex items-center justify-center">
                    <div className=" rounded-lg flex items-center flex-col">
                        <ProgressSpinner />
                    </div>
                </div>
            )}

            <div className="bg-white border border-gray-200 rounded-lg shadow h-max px-2 py-2">
                <DataTable
                    scrollable
                    header={header}
                    value={listingData}
                    tableStyle={{ minWidth: "50rem" }}
                >
                    <Column
                        frozen
                        field="customer.name"
                        header="Name"
                        style={{ width: "25%" }}
                    ></Column>
                    <Column
                        field="customer.name_urdu"
                        header="Name in Urdu"
                        style={{ width: "25%" }}
                    ></Column>
                    <Column
                        field="order_date"
                        header="Date"
                        style={{ width: "25%" }}
                    ></Column>
                    <Column
                        field="comment"
                        header="Comment"
                        style={{ width: "25%" }}
                    ></Column>
                    <Column field="total_amount" header="Order Total"></Column>
                    <Column
                        header="Actions"
                        body={editBodyTemplate}
                        style={{ width: "20%" }}
                    ></Column>
                </DataTable>
                <Paginator
                    leftContent={paginatorLeft}
                    rightContent={paginatorRight}
                    first={meta.from}
                    rows={meta.per_page}
                    totalRecords={meta.total}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onPageChange}
                />
            </div>

            {/* ======================================Overlay From Start=========================================== */}
            <div className="card flex justify-content-center">
                <Dialog
                    position={"right"}
                    header="Header"
                    visible={formVisibility}
                    onHide={() => dispatch(hideForm())}
                    style={{ width: "50vw" }}
                    breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                >
                    <SaleForm />
                </Dialog>
            </div>
            {/* ======================================Overlay From Ends=========================================== */}
        </>
    );
}
