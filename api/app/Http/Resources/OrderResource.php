<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user' => $this->user,
            'tickets' => $this->tickets->map(function($ticket) {
                return [
                    'ticket_id' => $ticket->id, 
                    'seat' => $ticket->seat,
                    'price' => $ticket->price,
                    'quantity' => $ticket->pivot->quantity,
                ];
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
