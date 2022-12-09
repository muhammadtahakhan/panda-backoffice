<?php

use App\Models\RenderJob;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Notifications\RenderJobCompleteNotification;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::any('/', [PageController::class, 'index']);
Route::get('/{any}', [PageController::class, 'index'])->where('any', '.*');