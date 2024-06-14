<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('events')->insert([
            [
                'name' => 'Concert A',
                'description' => 'Description for Concert A',
                'location' => 'Location A',
                'images' => json_encode(['image1.jpg', 'image2.jpg']),
                'event_date' => Carbon::now()->addDays(10),
                'start_time' => '18:00:00',
                'end_time' => '21:00:00',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Concert B',
                'description' => 'Description for Concert B',
                'location' => 'Location B',
                'images' => json_encode(['image3.jpg', 'image4.jpg']),
                'event_date' => Carbon::now()->addDays(20),
                'start_time' => '19:00:00',
                'end_time' => '22:00:00',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
