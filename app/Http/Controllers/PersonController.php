<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    /**
     * Show the form for creating the resource.
     */
    public function create(): never
    {
        abort(404);
    }

    /**
     * Store the newly created resource in storage.
     */
    public function store(Request $request)
    {
       
    }

    /**
     * Display the resource.
     */
    public function show()
    {
         $data_list = [
            ['id' => 1, 'name' => 'John Doe', 'age' => 30],
            ['id' => 2, 'name' => 'Jane Smith', 'age' => 25],
            ['id' => 3, 'name' => 'Alice Johnson', 'age' => 28],
            ['id' => 4, 'name' => 'Bob Brown', 'age' => 35],
        ];

        return Inertia::render('MyPage', [
            'mydata' => $data_list
        ]);
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the resource from storage.
     */
    public function destroy(): never
    {
        abort(404);
    }
}
