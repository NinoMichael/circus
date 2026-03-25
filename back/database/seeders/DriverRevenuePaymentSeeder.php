<?php

namespace Database\Seeders;

use App\Models\Driver;
use App\Models\DriverPayment;
use App\Models\DriverRevenue;
use App\Models\Trip;
use Illuminate\Database\Seeder;

class DriverRevenuePaymentSeeder extends Seeder
{
    public function run(): void
    {
        $drivers = Driver::all();

        if ($drivers->isEmpty()) {
            $this->command->warn('No drivers found. Please run DatabaseSeeder first.');
            return;
        }

        $trips = Trip::all();

        if ($trips->isEmpty()) {
            $this->command->warn('No trips found. Please run DatabaseSeeder first.');
            return;
        }

        foreach ($drivers as $driver) {
            $driverTrips = $trips->where('bus_id', $driver->buse?->id);

            $revenueCount = rand(5, 15);
            
            for ($i = 0; $i < $revenueCount; $i++) {
                $trip = $driverTrips->isNotEmpty() 
                    ? $driverTrips->random() 
                    : $trips->random();

                if (!$trip) {
                    continue;
                }

                $passengerCount = rand(1, 25);
                $farePerPassenger = rand(3000, 12000);
                $grossAmount = $passengerCount * $farePerPassenger;
                $commissionRate = 0.10;
                $commissionAmount = $grossAmount * $commissionRate;

                $revenue = DriverRevenue::create([
                    'driver_id' => $driver->id,
                    'trip_id' => $trip->id,
                    'gross_amount' => $grossAmount,
                    'commission_amount' => $commissionAmount,
                    'net_amount' => $grossAmount - $commissionAmount,
                    'passenger_count' => $passengerCount,
                    'fare_per_passenger' => $farePerPassenger,
                    'status' => 'calculated',
                    'calculation_date' => now()->subDays(rand(1, 90)),
                ]);

                if (rand(0, 1)) {
                    DriverPayment::create([
                        'driver_id' => $driver->id,
                        'driver_revenue_id' => $revenue->id,
                        'amount' => $revenue->net_amount,
                        'payment_method' => ['mvola', 'orange', 'airtel', 'stripe', 'cash'][rand(0, 4)],
                        'transaction_reference' => 'TXN-' . strtoupper(uniqid()),
                        'status' => 'completed',
                        'payment_date' => now()->subDays(rand(0, 30)),
                        'notes' => 'Paiement mensuel',
                    ]);
                }
            }

            $pendingRevenue = rand(1, 3);
            for ($i = 0; $i < $pendingRevenue; $i++) {
                $trip = $driverTrips->isNotEmpty() 
                    ? $driverTrips->random() 
                    : $trips->random();

                if (!$trip) {
                    continue;
                }

                DriverRevenue::create([
                    'driver_id' => $driver->id,
                    'trip_id' => $trip->id,
                    'gross_amount' => rand(20000, 100000),
                    'commission_amount' => rand(2000, 10000),
                    'net_amount' => rand(18000, 90000),
                    'passenger_count' => rand(1, 20),
                    'fare_per_passenger' => rand(3000, 12000),
                    'status' => 'pending',
                    'calculation_date' => null,
                ]);
            }
        }

        $this->command->info('Driver revenues and payments seeded successfully!');
    }
}
