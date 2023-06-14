<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePurchaseOrderRequest;
use App\Http\Requests\UpdatePurchaseOrderRequest;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderDetail;
use App\Models\ProductTransaction;
use Illuminate\Http\Request;
use App\Http\Resources\PurchaseOrderResource;
use Illuminate\Support\Facades\DB;


class PurchaseOrderController extends Controller
{
    private $per_page=10;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $query = PurchaseOrder::query()->orderBy('id', 'DESC');

            if (!empty($request->search)) {

                $query->where('comment', 'LIKE', '%' . $request->search . '%')
                ->orwhere('order_date', 'LIKE', '%' . $request->search . '%');

            }


            if($request->has('per_page'))  $this->per_page=$request->per_page;
            $data = $query->paginate( $this->per_page );

            return  PurchaseOrderResource::collection($data);


          } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()], 500);

        }
    }

     /**
     * Display a listing of the resource.
     *
     * @param  \App\Http\Requests\Request $request
     * @return \Illuminate\Http\Request
     */
    public function getByPartner(Request $request, $partner_id)
    {
        try {
            $query = PurchaseOrder::query()->orderBy('id', 'DESC')->where('partner_id', $partner_id)->with('customer');

            if (!empty($request->search)) {

                $query->where('comment', 'LIKE', '%' . $request->search . '%')
                ->orwhere('order_date', 'LIKE', '%' . $request->search . '%');
            }

            if($request->has('per_page'))  $this->per_page=$request->per_page;
            $data = $query->paginate( $this->per_page );

            return  PurchaseOrderResource::collection($data);

          } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()], 500);

        }
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePurchaseOrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePurchaseOrderRequest $request)
    {
        try {
            /*------------------------------------------
            --------------------------------------------
            Start DB Transaction
            --------------------------------------------
            --------------------------------------------*/
            DB::beginTransaction();

            $data = PurchaseOrder::create( $request->post() );

            $order_items = $request->post('items');

            foreach ($order_items as $key => $value) {
                $value['purchase_order_id'] = $data->id;
                $value['total_amount'] =  $value['quantity'] * $value['unit_price'];
                $order_details = PurchaseOrderDetail::create($value);
                $batch['product_id'] = $value['product_id'];
                $batch['quantity'] = $value['quantity'];
                $batch['batch'] = $value['batch'];
                $batch['cost_price'] = $value['unit_price'];
                $batch['sale_price'] = $value['sale_price'];
                ProductTransaction::create($batch);

            }
            DB::commit();
            return response(['data' => new PurchaseOrderResource($data)]);
            /*------------------------------------------
            --------------------------------------------
            Commit Transaction to Save Data to Database
            --------------------------------------------
            --------------------------------------------*/

      } catch (\Exception $e) {
            /*------------------------------------------
            --------------------------------------------
            Rollback Database Entry
            --------------------------------------------
            --------------------------------------------*/
            DB::rollback();
        return response()->json(['message' => $e->getMessage()], 500);

    }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PurchaseOrder  $purchaseOrder
     * @return \Illuminate\Http\Response
     */
    public function show(PurchaseOrder $purchaseOrder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PurchaseOrder  $purchaseOrder
     * @return \Illuminate\Http\Response
     */
    public function edit(PurchaseOrder $purchaseOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePurchaseOrderRequest  $request
     * @param  \App\Models\PurchaseOrder  $purchaseOrder
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePurchaseOrderRequest $request, PurchaseOrder $purchaseOrder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PurchaseOrder  $purchaseOrder
     * @return \Illuminate\Http\Response
     */
    public function destroy(PurchaseOrder $purchaseOrder, $id)
    {
        try {

            $data = PurchaseOrder::destroy($id);
            return response(['message' => "Delete successfully" ]);

        } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()], 500);

      }
    }
}
