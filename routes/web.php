<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CompanyController;
use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Route;


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

Route::get('/', function () {
    return view('welcome');
});


Route::delete('/u/{id}', [UserController::class,'destroy'])->name('users.destroy');
Route::any('/proxy/{url}', [ProxyController::class,'handle'])->where('url', '.*');
Route::get('/u',[UserController::class,'index']);
Route::post('/addUser',[UserController::class,'store'])->middleware('web')->name('user.add');



Route::get('/companies', [CompanyController::class,'index']);
Route::post('/addCompany',[CompanyController::class,'store'])->middleware('web')->name('companies.add');

