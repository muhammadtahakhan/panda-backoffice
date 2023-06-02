<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSaleOrderRequest;
use App\Http\Requests\UpdateSaleOrderRequest;
use App\Models\SaleOrder;
use App\Models\SaleOrderDetail;
use Illuminate\Http\Request;
use App\Http\Resources\SaleOrderResource;
use Illuminate\Support\Facades\DB;


class SaleOrderController extends Controller
{
    private $per_page=10;
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Http\Requests\Request $request
     * @return \Illuminate\Http\Request
     */
    public function index(Request $request)
    {
        try {
            $query = SaleOrder::query()->orderBy('id', 'DESC');

            if (!empty($request->search)) {

                $query->where('comment', 'LIKE', '%' . $request->search . '%')
                ->orwhere('order_date', 'LIKE', '%' . $request->search . '%');

            }


            if($request->has('per_page'))  $this->per_page=$request->per_page;
            $data = $query->paginate( $this->per_page );

            return  SaleOrderResource::collection($data);


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
            $query = SaleOrder::query()->orderBy('id', 'DESC')->where('partner_id', $partner_id)->order->with('customer');

            if (!empty($request->search)) {

                $query->where('comment', 'LIKE', '%' . $request->search . '%')
                ->orwhere('order_date', 'LIKE', '%' . $request->search . '%');
            }

            if($request->has('per_page'))  $this->per_page=$request->per_page;
            $data = $query->paginate( $this->per_page );

            return  SaleOrderResource::collection($data);

          } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()], 500);

        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSaleOrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSaleOrderRequest $request)
    {

        try {
                /*------------------------------------------
                --------------------------------------------
                Start DB Transaction
                --------------------------------------------
                --------------------------------------------*/
                DB::beginTransaction();

                $data = SaleOrder::create( $request->post() );

                $data->save();

                $order_items = $request->post('items');

                foreach ($order_items as $key => $value) {
                    $value['sale_order_id'] = $data->id;
                    $value['total_amount'] =  $value['quantity'] * $value['unit_price'];
                   $order_details = SaleOrderDetail::create($value);
                   $order_details->save();
                }
                DB::commit();
                return response(['data' => new SaleOrderResource($data)]);
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
     * @param  \App\Models\SaleOrder  $saleOrder
     * @return \Illuminate\Http\Response
     */
    public function show(SaleOrder $saleOrder)
    {
        //
    }

      /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSaleOrderRequest  $request
     * @param  \App\Models\SaleOrder  $saleOrder
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSaleOrderRequest $request, SaleOrder $saleOrder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SaleOrder  $saleOrder
     * @return \Illuminate\Http\Response
     */
    public function destroy(SaleOrder $saleOrder, $id)
    {
        try {

            $data = SaleOrder::destroy($id);
            return response(['message' => "Delete successfully" ]);

        } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()], 500);

      }
    }
}
