<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return OrderResource::collection($orders);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'tickets' => 'required|array',
            'tickets.*.ticket_id' => 'required|integer|exists:tickets,id',
            'tickets.*.quantity' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $order = Order::create([
            'user_id' => $request->user_id,
        ]);

        foreach ($request->tickets as $ticket) {
            $order->tickets()->attach($ticket['ticket_id'], ['quantity' => $ticket['quantity']]);
        }

        return new OrderResource($order);
    }

    public function show($id)
    {
        $order = Order::findOrFail($id);
        return new OrderResource($order);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'tickets' => 'required|array',
            'tickets.*.ticket_id' => 'required|integer|exists:tickets,id',
            'tickets.*.quantity' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $order = Order::findOrFail($id);
        $order->update([
            'user_id' => $request->user_id,
        ]);

        $order->tickets()->detach();
        foreach ($request->tickets as $ticket) {
            $order->tickets()->attach($ticket['ticket_id'], ['quantity' => $ticket['quantity']]);
        }

        return new OrderResource($order);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(null, 204);
    }
}
