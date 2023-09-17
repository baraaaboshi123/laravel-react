<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    //
    public function index(){
        return Company::all();
    }

    public function store(Request $request){

        $data=$request->json()->all();
        $company = Company::create([
            'name' => $data['companyName'],
            'email' => $data['companyEmail'],
            'mobile_number' =>$data['companyPhone'],
            'address_city' =>$data['companyCity'],
            'address_region' =>$data['companyRegion'],
        ]);

        return response()->json(['message'=>'company added successfully']) ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    }
}
