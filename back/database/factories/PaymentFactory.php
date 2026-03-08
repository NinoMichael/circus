<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Payment;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $booking = Booking::factory()->create();

        return [
            'booking_id' => $booking->id,
            'amount' => $booking->total_amount,
            'payment_method' => fake()->randomElement([
                'mvola',
                'orange',
                'airtel',
                'stripe',
                'cash'
            ]),
            'transaction_reference' => strtoupper(Str::random(12)),
            'paid_at' => now(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function ($payment) {

            Ticket::create([
                'payment_id' => $payment->id,
                'ticket_reference' => 'TCK-' . strtoupper(Str::random(8)),
                'path_file' => 'tickets/ticket_' . $payment->id . '.pdf'
            ]);

        });
    }
}
