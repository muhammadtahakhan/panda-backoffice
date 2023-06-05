<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductTransactionRequest;
use App\Http\Requests\UpdateProductTransactionRequest;
use App\Models\ProductTransaction;
use Illuminate\Http\Request;
use App\Http\Resources\ProductTransactionResource;
use Illuminate\Support\Facades\DB;

class ProductTransactionController extends Controller
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
            $query = ProductTransaction::query()->orderBy('id','DESC');
            if (!empty($request->search)) {
                $query->where('batch','LIKE','%' .$request->search . '%')
                ->orwhere('cost_price', 'LIKE', '%' . $request->search . '%');
            }

            if($request->has('per_page')) $this->per_page=$request->per_page;
            $data = $query->paginate( $this->per_page );

            return  ProductTransactionResource::collection($data);

        } catch (\Exception $e) {
            return response()->json(['message'=> $e->getMessage()], 500);
        }
    }

    public function getByProduct(Request $request, $product_id)
    {
        try {
            $query = ProductTransaction::query()->where('product_id', $product_id)->orderBy('id','DESC');
            if (!empty($request->search)) {
                $query->where('batch','LIKE','%' .$request->search . '%')
                ->orwhere('cost_price', 'LIKE', '%' . $request->search . '%');
            }

            if($request->has('per_page')) $this->per_page=$request->per_page;
            $data = $query->paginate( $this->per_page );

            return  ProductTransactionResource::collection($data);

        } catch (\Exception $e) {
            return response()->json(['message'=> $e->getMessage()], 500);
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
     * @param  \App\Http\Requests\StoreProductTransactionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductTransactionRequest $request)
    {
        try {
                DB::beginTransaction();
                $data = ProductTransaction::create( $request->post() );

                DB::commit();
                return response(['data' => new ProductTransactionResource($data)]);
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
     * @param  \App\Models\ProductTransaction  $productTransaction
     * @return \Illuminate\Http\Response
     */
    public function show(ProductTransaction $productTransaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductTransaction  $productTransaction
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductTransaction $productTransaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductTransactionRequest  $request
     * @param  \App\Models\ProductTransaction  $productTransaction
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductTransactionRequest $request, $id)
    {
        try {
            $query = ProductTransaction::find($id);
            $query->fill($request->all());
            $data = $query->save();

            if ($data) {
                return response(['data' => new ProductTransactionResource($query)]);
            } else {
                return response()->json(['message' => "Oops some thing is wrong"], 500);
            }

        } catch (\Exception $e) {
            return response()->json(['message' => $e.getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductTransaction  $productTransaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductTransaction $productTransaction, $id)
    {
        try {
            $data = ProductTransaction::destroy($id);
            return response(['message' => "Delete successfully"]);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
