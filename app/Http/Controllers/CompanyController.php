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

        try {
            $data=$request->json()->all();
        $company = Company::create([
            'name' => $data['companyName'],
            'email' => $data['companyEmail'],
            'mobile_number' =>$data['companyPhone'],
            'address_city' =>$data['companyCity'],
            'address_region' =>$data['companyRegion'],
        ]);

        return response()->json(['message'=>'company added successfully']) ;  
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
