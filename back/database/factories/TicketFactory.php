<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'payment_id' => Payment::factory(),
            'ticket_reference' => 'TCK-' . strtoupper(Str::random(8)),
            'path_file' => 'tickets/' . Str::uuid() . '.pdf',
        ];
    }
}
