<?php

namespace App\Http\Controllers;

use App\Models\Queue;
use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Models\User;

class QueueController extends Controller
{
    public function addToQueue(Request $request)
    {
        $user = User::find($request->user_id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $queue = Queue::create([
            'user_id' => $user->id,
            'ticket_id' => $request->ticket_id,
            'quantity' => $request->quantity,
            'is_processed' => false
        ]);

        return response()->json($queue, 201);
    }

    public function processQueue()
    {
        $nextInQueue = Queue::where('is_processed', false)->orderBy('created_at')->first();
    
        if (!$nextInQueue) {
            return response()->json(['message' => 'Queue is empty'], 200);
        }
    
        $ticket = Ticket::find($nextInQueue->ticket_id);
        if ($ticket->quantity < $nextInQueue->quantity) {
            $nextInQueue->delete();  // Obrisati unos iz reda čekanja ako nema dovoljno karata
            return response()->json(['message' => 'Not enough tickets available, entry removed from queue'], 200);
        }
    
        $ticket->quantity -= $nextInQueue->quantity;
        $ticket->save();
    
        $nextInQueue->is_processed = true;
        $nextInQueue->save();
    
        // Logika za omogućavanje pristupa korisniku može biti dodata ovde
    
        return response()->json($nextInQueue, 200);
    }
    
}
