<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\ProductAdjustmentRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\ProductTransaction;
use App\Http\Resources\ProductResource;


class ProductController extends Controller
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
            $query = Product::query();

            if (!empty($request->search)) {
                $query->where('name', 'LIKE', '%' . $request->search . '%')
                ->orwhere('name_urdu', 'LIKE', '%' . $request->search . '%')
                ->orwhere('code', 'LIKE', '%' . $request->search . '%')
                ->orwhere('cost_price', 'LIKE', '%' . $request->search . '%')
                ->orwhere('sale_price', 'LIKE', '%' . $request->search . '%');
            }


            if($request->has('per_page'))  $this->per_page=$request->per_page;
            $products = $query->paginate( $this->per_page );

            return  ProductResource::collection($products);


          } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()], 500);

        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        try {


            $product = Product::create($request->post());
            return response(['data' => new ProductResource($product)]);

          } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()], 500);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $product = Product::find($id);
            return response(['data' => new ProductResource($product)]);

        } catch (\Exception $e) {

          return response()->json(['message' => $e->getMessage()], 500);

      }
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, $id)
    {
        try {
            $query = Product::find($id);
            $query->fill($request->all());
            $data = $query->save();

            if ($data) {
                return response(['data' => new ProductResource($query) ]);
            } else {
                return response()->json(['message' => "Oops some thing is wrong"], 500);
            }

            //return response(['data' => new ProductResource($product)]);

        } catch (\Exception $e) {

          return response()->json(['message' => $e->getMessage()], 500);

      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {

            $product = Product::destroy($id);
            return response(['message' => "Delete successfully" ]);

        } catch (\Exception $e) {

          return response()->json(['message' => $e->getMessage()], 500);

      }
    }

    public function product_adjustment(ProductAdjustmentRequest $request)
    {
        try {

            $product = product::first()->quantity;
            print_r($product); die();
            return response(['data' => new ProductResource($product)]);

          } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()], 500);

        }
    }

}
