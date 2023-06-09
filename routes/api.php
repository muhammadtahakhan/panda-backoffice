<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RenderJobController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\RenderClientController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SaleOrderController;
use App\Http\Controllers\SceneTemplateController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PartnerController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/mobile/login', function (Request $request) {

    try{

        $rules = [
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
    ];

    $validator = \Validator::make($request->all(), $rules);

    // print_r($validator->errors()); die();
    if ($validator->fails()) {
       return response()->json($validator->errors(), 422);
    }

    $user = User::where('email', $request->email)->first();
    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
        // echo "hello";die();
    }

    return $user->createToken($request->device_name);

    }catch(\Exception $e){
        return response()->json(["error"=>"some thing went wrong please check your credentials"], 422);
    }


});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [RegistrationController::class, 'register']);
Route::post('/register/verify/{id}/{hash}', [RegistrationController::class, 'verify']);

Route::post('/password', [PasswordController::class, 'store']);
Route::post('/password/reset', [PasswordController::class, 'reset']);
Route::post('/register/resend-verification-email', [RegistrationController::class, 'resend']);



Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('/user/me', [UserController::class, 'me']);

    Route::post('/logout', [AuthController::class]);


    Route::get('/product', [ProductController::class, 'index']);
    Route::post('/product', [ProductController::class, 'store']);
    Route::get('/product/{id}', [ProductController::class, 'show']);
    Route::delete('/product/{id}', [ProductController::class, 'destroy']);
    Route::post('/product_adjustment', [ProductController::class, 'product_adjustment']);


    Route::get('/partner', [PartnerController::class, 'index']);
    Route::post('/partner', [PartnerController::class, 'store']);
    Route::get('/partner/{id}', [PartnerController::class, 'show']);
    Route::delete('/partner/{id}', [PartnerController::class, 'destroy']);
    Route::patch('/partner/{id}', [PartnerController::class, 'update']);

    // get all sale orders
    Route::get('/sale_order', [SaleOrderController::class, 'index']);
     // create sale order
    Route::post('/sale_order', [SaleOrderController::class, 'store']);
    // get all sale orders by specific partner
    Route::get('/sale_order/{partner_id}', [SaleOrderController::class, 'getByPartner']);
    // delete sale order by {id}
    Route::delete('/sale_order/{id}', [SaleOrderController::class, 'destroy']);


});

