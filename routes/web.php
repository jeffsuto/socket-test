<?php

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

Route::get('send', function(){
    $data = [
        'id' => 1,
        'name' => 'Jeffry Suyanto',
        'status' => 'active'
    ];
    event(new App\Events\Contoh($data));
});
