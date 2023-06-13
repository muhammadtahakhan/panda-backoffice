import DefaultContainer from "../../components/common/layout/DefaultContainer";
import PageTitle from "../../components/common/typography/PageTitle";
import React, { useDebugValue, useEffect, useRef, useState } from "react";
import SiteTitle from "../../components/global/SiteTitle";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPartners,
    hideForm,
    showForm,
    deletePartners,
} from "../../redux/partnerSlice";

// ==================================Prime React Imports
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";
import classNames from "classnames";
import PartnerFrom from "./partnerForm";
import { TieredMenu } from "primereact/tieredmenu";
import MakePartnerPayment from "./makePartnerPayment";

export default function Partners() {
    const dispatch = useDispatch();
    const [paymentFormVis, setPaymentFormVis] = useState(false);
    const { listingData, isLoading, formVisibility } = useSelector(
        (state) => state.partners
    );

    useEffect(() => {
        dispatch(fetchPartners());
    }, [dispatch]);

    // =================================================================================Data Table Template
    const paginatorLeft = (
        <Button
            onClick={() => {
                dispatch(fetchPartners());
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

    // //////////////////////////  ////////////////////////////////////
    const [selectedRow, setSelectedRow] = useState({});
    const menu = useRef(null);
    const items = [
        {
            label: "Edit",
            icon: "pi pi-pencil",
            command: () => {
                console.log("selected", selectedRow.rowData.id);
                dispatch(showForm(selectedRow.rowData));
            },
        },
        {
            label: "Receive Payment",
            icon: "pi pi-pencil",
            command: () => {
                setPaymentFormVis(true);
            },
        },
        {
            label: "Delete",
            icon: "pi pi-trash",
            command: () => {
                dispatch(deletePartners(selectedRow.rowData.id));
            },
        },
    ];
    const editBodyTemplate = (rowData) => {
        return (
            <>
                <TieredMenu
                    onHide={() => {
                        // setSelectedRow({});
                        // debugger;
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
                        console.log(rowData)
                        menu.current.toggle(e);
                    }}
                ></i>
            </>
        );
    };
    // //////////////////////////// 4\6\2023\ //////////////////////////////////

    return (
        <>
            <SiteTitle>Partners</SiteTitle>

            <PageTitle>Partners Listing</PageTitle>
            {isLoading && (
                <div lass="fixed top-0 left-0 z-50 flex items-center justify-center">
                    <div className=" rounded-lg flex items-center flex-col">
                        <ProgressSpinner />
                    </div>
                </div>
            )}

            {/* Data Table */}
            <div className="bg-white border border-gray-200 rounded-lg shadow h-max px-2 py-2">
                <DataTable
                    header={header}
                    value={listingData}
                    paginator
                    rows={3}
                    rowsPerPageOptions={[3, 5, 10, 25, 50]}
                    tableStyle={{ minWidth: "50rem" }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    paginatorLeft={paginatorLeft}
                    paginatorRight={paginatorRight}
                >
                    <Column
                        field="name"
                        header="Name"
                        style={{ width: "25%" }}
                    ></Column>
                    <Column
                        field="name_urdu"
                        header="Name in Urdu"
                        style={{ width: "25%" }}
                    ></Column>
                    <Column
                        field="phone"
                        header="Phone"
                        style={{ width: "25%" }}
                    ></Column>
                    <Column
                        field="address"
                        header="Address"
                        style={{ width: "25%" }}
                    ></Column>
                    <Column field="balance" header="Balance"></Column>
                    <Column
                        header="Actions"
                        body={editBodyTemplate}
                        style={{ width: "20%" }}
                    ></Column>
                </DataTable>
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
                    <PartnerFrom />
                </Dialog>
            </div>
            {/* ======================================Overlay From Ends=========================================== */}
             {/* ======================================Overlay Payment From Start=========================================== */}
             <div className="card flex justify-content-center">
                <Dialog
                    position={"right"}f
                    header="Header"
                    visible={paymentFormVis}
                    onHide={() => setPaymentFormVis(false)}
                    style={{ width: "50vw" }}
                    breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                >
                    <MakePartnerPayment setPaymentFormVis={setPaymentFormVis} partner={selectedRow.rowData} />
                </Dialog>
            </div>
            {/* ======================================Overlay Payment From Ends=========================================== */}
        </>
    );
}
