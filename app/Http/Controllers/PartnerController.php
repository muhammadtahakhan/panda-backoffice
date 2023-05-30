<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePartnerRequest;
use App\Http\Requests\UpdatePartnerRequest;
use App\Models\Partner;
use App\Http\Resources\PartnerResource;
use Illuminate\Http\Request;



class PartnerController extends Controller
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
            $query = Partner::query();

            if (!empty($request->search)) {
                $query->where('name', 'LIKE', '%' . $request->search . '%')
                ->orwhere('name_urdu', 'LIKE', '%' . $request->search . '%')
                ->orwhere('phone', 'LIKE', '%' . $request->search . '%')
                ->orwhere('address', 'LIKE', '%' . $request->search . '%');
            }


            if($request->has('per_page'))  $this->per_page=$request->per_page;
            $data = $query->paginate( $this->per_page );

            return  PartnerResource::collection($data);


          } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()], 500);

        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePartnerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePartnerRequest $request)
    {
        try {


            $data = Partner::create($request->post());
            return response(['data' => new PartnerResource($data)]);

          } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()], 500);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Partner  $partner
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $data = Partner::find($id);
            return response(['data' => new PartnerResource($data)]);

        } catch (\Exception $e) {

          return response()->json(['message' => $e->getMessage()], 500);

      }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePartnerRequest  $request
     * @param  \App\Models\Partner  $partner
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePartnerRequest $request, $id)
    {
        try {
          $query = Partner::find($id);
          $query->fill($request->all());
          $data = $query->save();

            if( $query->save()){
                return response(['data' => new PartnerResource($query)]);
            }else{
                return response()->json(['message' => "Oops some thing is wrong"], 500);
            }

          } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()], 500);

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Partner  $partner
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {

            $data = Partner::destroy($id);
            return response(['message' => "Delete successfully" ]);

        } catch (\Exception $e) {

          return response()->json(['message' => $e->getMessage()], 500);

      }
    }
}
