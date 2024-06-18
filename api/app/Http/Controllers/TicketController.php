<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\TicketResource;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::all();
        return TicketResource::collection($tickets);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'event_id' => 'required|integer',
            'seat' => 'required|string|max:255',
            'price' => 'required|numeric',
            'ticket_type_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $ticket = Ticket::create($request->all());
        return new TicketResource($ticket);
    }

    public function show($id)
    {
        $ticket = Ticket::findOrFail($id);
        return new TicketResource($ticket);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'event_id' => 'required|integer',
            'seat' => 'required|string|max:255',
            'price' => 'required|numeric',
            'ticket_type_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $ticket = Ticket::findOrFail($id);
        $ticket->update($request->all());
        return new TicketResource($ticket);
    }

    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();
        return response()->json(null, 204);
    }
}
