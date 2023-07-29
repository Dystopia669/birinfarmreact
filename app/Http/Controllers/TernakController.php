<?php

namespace App\Http\Controllers;

use App\Models\Ternak;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\TernakCollection;

class TernakController extends Controller
{
    public function ternakPage()
    {
        $ternakData = Ternak::all();

        return Inertia::render('Ternak', [
            'title' => 'Ternak',
            'pages' => 'Ternak',
            'ternak' => new TernakCollection($ternakData),
        ]);
    }

    public function detailTernak(Ternak $ternak, Request $request)
    {
        $getTernakById = $ternak->with(['jenis_ternak', 'rings'])->find($request->id);

        return Inertia::render('DetailTernak', [
            'title' => 'Ternak',
            'pages' => 'Ternak',
            'ternakDetail' => $getTernakById,
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ternak  $ternak
     * @return \Illuminate\Http\Response
     */
    public function show(Ternak $ternak)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ternak  $ternak
     * @return \Illuminate\Http\Response
     */
    public function edit(Ternak $ternak)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ternak  $ternak
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ternak $ternak)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ternak  $ternak
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ternak $ternak)
    {
        //
    }
}