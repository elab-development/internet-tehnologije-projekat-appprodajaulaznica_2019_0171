<?php

namespace Database\Seeders;

use App\Models\TicketType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ticketTypes = [
            ['name' => 'Regular', 'price' => 50],
            ['name' => 'VIP', 'price' => 100],
            ['name' => 'Student', 'price' => 30],
        ];

        foreach ($ticketTypes as $type) {
            TicketType::create($type);
        }
      
    }
}
