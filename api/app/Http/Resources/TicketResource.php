<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'event_id' => $this->event_id,
            'seat' => $this->seat,
            'price' => $this->price,
            'ticket_type_id' => $this->ticket_type_id,
            'event' => $this->event,
            'ticket_type' => $this->ticketType,
            'orders' => $this->orders,
        ];
    }
}
