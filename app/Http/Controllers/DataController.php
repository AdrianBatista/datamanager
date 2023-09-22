<?php

namespace App\Http\Controllers;

use App\Models\Data;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Workspace $workspace)
    {
        $workspace = $workspace->load(['datas' => fn ($q) => $q->latest()]);
        return Inertia::render('Workspaces/Datas/Index', compact('workspace'));
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
            'title' => 'required|string|max:255',
        ]);

        Data::create([
            ...$validated,
            'workspace_id' => $workspace->id,
            'author_id' => user()->id,
        ]);

        return redirect(route('workspaces.datas.index', $workspace->id));
    }

    /**
     * Display the specified resource.
     */
    public function show(Data $data)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Data $data)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Data $data)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Data $data)
    {
        //
    }
}
