<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class UserController extends Controller
{

    public function me(Request $request)
    {
        if ($request->user()) {
            return new UserResource($request->user());
        } else {
            return response()->json(['message' => 'Unauthenticated']);
        }
    }
}
