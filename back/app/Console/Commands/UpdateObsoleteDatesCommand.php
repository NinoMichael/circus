<?php

namespace App\Console\Commands;

use App\Models\Booking;
use App\Models\Payment;
use App\Models\PromoCode;
use App\Models\Trip;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateObsoleteDatesCommand extends Command
{
    protected $signature = 'trips:update-dates {--days=10 : Nombre de jours à ajouter} {--dry-run : Simuler sans modifier} {--force : Forcer sans confirmation}';

    protected $description = 'Mettre à jour les dates obsolètes des trips, bookings et autres en ajoutant des jours';

    protected $daysToAdd;

    public function handle(): int
    {
        $this->daysToAdd = (int) $this->option('days');
        $dryRun = $this->option('dry-run');

        if ($dryRun) {
            $this->warn('Mode simulation - Aucune modification ne sera appliquée.');
        } else {
            if (!$this->option('force')) {
                if (!$this->confirm("Êtes-vous sûr de vouloir ajouter {$this->daysToAdd} jours aux dates obsolètes? Cette action est irréversible.")) {
                    $this->info('Opération annulée.');
                    return Command::SUCCESS;
                }
            }
        }

        $this->info("Mise à jour des dates en ajoutant {$this->daysToAdd} jours...");

        try {
            if ($dryRun) {
                $this->simulateUpdates();
            } else {
                $this->performUpdates();
            }

            $this->info('Opération terminée avec succès!');
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Erreur: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }

    protected function simulateUpdates(): void
    {
        $this->line("\n--- Simulation des mises à jour ---\n");

        $trips = Trip::where('departure_time', '<', now())->get();
        $this->line("Trips concernés: {$trips->count()}");

        $bookings = Booking::where('created_at', '<', now()->subDays(30))->get();
        $this->line("Bookings concernés: {$bookings->count()}");

        $payments = Payment::where('paid_at', '<', now()->subDays(30))->get();
        $this->line("Paiements concernés: {$payments->count()}");

        $promoCodes = PromoCode::where('valid_until', '<', now())->get();
        $this->line("Codes promo expirés: {$promoCodes->count()}");
    }

    protected function performUpdates(): void
    {
        $totalUpdates = 0;

        DB::transaction(function () use (&$totalUpdates) {
            $tripsUpdated = $this->updateTrips();
            $totalUpdates += $tripsUpdated;
            $this->info("Trips mis à jour: {$tripsUpdated}");

            $bookingsUpdated = $this->updateBookings();
            $totalUpdates += $bookingsUpdated;
            $this->info("Bookings mis à jour: {$bookingsUpdated}");

            $paymentsUpdated = $this->updatePayments();
            $totalUpdates += $paymentsUpdated;
            $this->info("Paiements mis à jour: {$paymentsUpdated}");

            $promoCodesUpdated = $this->updatePromoCodes();
            $totalUpdates += $promoCodesUpdated;
            $this->info("Codes promo mis à jour: {$promoCodesUpdated}");

            $this->line("\nTotal des mises à jour: {$totalUpdates}");
        });
    }

    protected function updateTrips(): int
    {
        $count = Trip::where('departure_time', '<', now())
            ->where('status', 'scheduled')
            ->count();

        if ($count > 0) {
            Trip::where('departure_time', '<', now())
                ->where('status', 'scheduled')
                ->update([
                    'departure_time' => DB::raw("departure_time + INTERVAL '{$this->daysToAdd} days'"),
                    'arrival_time' => DB::raw("arrival_time + INTERVAL '{$this->daysToAdd} days'"),
                ]);
        }

        return $count;
    }

    protected function updateBookings(): int
    {
        $count = Booking::where('created_at', '<', now()->subDays(7))->count();

        if ($count > 0) {
            Booking::where('created_at', '<', now()->subDays(7))
                ->update([
                    'created_at' => DB::raw("created_at + INTERVAL '{$this->daysToAdd} days'"),
                    'updated_at' => DB::raw("updated_at + INTERVAL '{$this->daysToAdd} days'"),
                ]);
        }

        return $count;
    }

    protected function updatePayments(): int
    {
        $count = Payment::whereNotNull('paid_at')
            ->where('paid_at', '<', now()->subDays(7))
            ->count();

        if ($count > 0) {
            Payment::whereNotNull('paid_at')
                ->where('paid_at', '<', now()->subDays(7))
                ->update([
                    'paid_at' => DB::raw("paid_at + INTERVAL '{$this->daysToAdd} days'"),
                    'created_at' => DB::raw("created_at + INTERVAL '{$this->daysToAdd} days'"),
                    'updated_at' => DB::raw("updated_at + INTERVAL '{$this->daysToAdd} days'"),
                ]);
        }

        return $count;
    }

    protected function updatePromoCodes(): int
    {
        $count = PromoCode::where('valid_until', '<', now())->count();

        if ($count > 0) {
            PromoCode::where('valid_until', '<', now())
                ->update([
                    'valid_from' => DB::raw("valid_from + INTERVAL '{$this->daysToAdd} days'"),
                    'valid_until' => DB::raw("valid_until + INTERVAL '{$this->daysToAdd} days'"),
                ]);
        }

        return $count;
    }
}