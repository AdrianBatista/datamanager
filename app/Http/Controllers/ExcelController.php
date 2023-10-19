<?php

namespace App\Http\Controllers;

use App\Models\Excel;
use App\Models\Workspace;
use App\Modules\LocalStorage;
use Illuminate\Http\Request;

class ExcelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Workspace $workspace)
    {
        $validated = $request->validate([
            'file' => 'file',
        ]);

        $fileDestiny = LocalStorage::saveExcelFile($workspace, $validated['file']);

        Excel::create([
            'workspace_id' => $workspace->id,
            'file' => $fileDestiny,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Excel $excel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Excel $excel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Excel $excel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Excel $excel)
    {
        //
    }
}
