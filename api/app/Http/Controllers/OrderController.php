<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Ticket;
use App\Models\Queue;
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
            'tickets.*.quantity' => 'required|integer|min:1',
            'tickets.*.seat' => 'required|string|max:255',
            'tickets.*.price' => 'required|numeric',
            'tickets.*.ticket_type_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        foreach ($request->tickets as $ticket) {
            $ticketModel = Ticket::find($ticket['ticket_id']);
            if ($ticketModel->quantity < $ticket['quantity']) {
                Queue::create([
                    'user_id' => $request->user_id,
                    'ticket_id' => $ticket['ticket_id'],
                    'quantity' => $ticket['quantity'],
                    'is_processed' => false
                ]);
                return response()->json(['message' => 'Not enough tickets available, added to queue'], 202);
            }
        }

        $order = Order::create([
            'user_id' => $request->user_id,
        ]);

        foreach ($request->tickets as $ticket) {
            $ticketModel = Ticket::create([
                'event_id' => $ticket['event_id'],
                'seat' => $ticket['seat'],
                'price' => $ticket['price'],
                'ticket_type_id' => $ticket['ticket_type_id'],
                'quantity' => $ticket['quantity']
            ]);
            $ticketModel->quantity -= $ticket['quantity'];
            $ticketModel->save();
            $order->tickets()->attach($ticketModel->id, ['quantity' => $ticket['quantity']]);
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
            'tickets.*.quantity' => 'required|integer|min:1',
            'tickets.*.seat' => 'required|string|max:255',
            'tickets.*.price' => 'required|numeric',
            'tickets.*.ticket_type_id' => 'required|integer'
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
            $ticketModel = Ticket::create([
                'event_id' => $ticket['event_id'],
                'seat' => $ticket['seat'],
                'price' => $ticket['price'],
                'ticket_type_id' => $ticket['ticket_type_id'],
                'quantity' => $ticket['quantity']
            ]);
            $ticketModel->quantity -= $ticket['quantity'];
            $ticketModel->save();
            $order->tickets()->attach($ticketModel->id, ['quantity' => $ticket['quantity']]);
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
?>
