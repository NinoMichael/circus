<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\DriverRevenue;
use App\Models\DriverPayment;
use App\Models\Trip;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PerformanceController extends Controller
{
    /**
     * Fetch driver performance for analytics
     * 
     * @param Request $request
     * @param Driver $driver
     * 
     * @return JsonResponse
     */
    public function getDriverPerformance(Request $request, Driver $driver): JsonResponse
    {
        $period = $request->query('period', 'weekly');
        
        $now = Carbon::now();
        
        switch ($period) {
            case 'monthly':
                $startDate = $now->copy()->startOfMonth();
                $previousStartDate = $now->copy()->subMonth()->startOfMonth();
                $previousEndDate = $now->copy()->subMonth()->endOfMonth();
                break;
            case 'yearly':
                $startDate = $now->copy()->startOfYear();
                $previousStartDate = $now->copy()->subYear()->startOfYear();
                $previousEndDate = $now->copy()->subYear()->endOfYear();
                break;
            default:
                $startDate = $now->copy()->startOfWeek();
                $previousStartDate = $now->copy()->subWeek()->startOfWeek();
                $previousEndDate = $now->copy()->subWeek()->endOfWeek();
        }

        $totalRevenue = DriverRevenue::where('driver_id', $driver->id)
            ->where('status', '!=', 'pending')
            ->where('calculation_date', '>=', $startDate)
            ->sum('net_amount');

        $previousRevenue = DriverRevenue::where('driver_id', $driver->id)
            ->where('status', '!=', 'pending')
            ->whereBetween('calculation_date', [$previousStartDate, $previousEndDate])
            ->sum('net_amount');

        $pendingRevenue = DriverRevenue::where('driver_id', $driver->id)
            ->where('status', 'pending')
            ->sum('net_amount');

        $revenueChange = $previousRevenue > 0 
            ? round((($totalRevenue - $previousRevenue) / $previousRevenue) * 100, 1)
            : 0;

        $weeklyData = $this->getWeeklyRevenueData($driver->id);
        $monthlyData = $this->getMonthlyRevenueData($driver->id);
        $yearlyData = $this->getYearlyRevenueData($driver->id);

        $fillRate = $this->getFillRate($driver->id, $period);

        return response()->json([
            'total_revenue' => $totalRevenue,
            'revenue_change' => $revenueChange,
            'weekly_revenue' => $period === 'weekly' ? $totalRevenue : DriverRevenue::where('driver_id', $driver->id)
                ->where('status', '!=', 'pending')
                ->where('calculation_date', '>=', $now->copy()->startOfWeek())
                ->sum('net_amount'),
            'pending_amount' => $pendingRevenue,
            'fill_rate' => $fillRate['rate'],
            'average_passengers' => $fillRate['avg_passengers'],
            'max_capacity' => $fillRate['max_capacity'],
            'revenue_chart' => [
                'weekly' => $weeklyData,
                'monthly' => $monthlyData,
                'yearly' => $yearlyData,
            ],
        ]);
    }

    /**
     * Calculate weekly revenue for driver
     * 
     * @param int $driverId
     * 
     * @return array
     */
    private function getWeeklyRevenueData(int $driverId): array
    {
        $data = [];
        $days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        
        for ($i = 0; $i < 7; $i++) {
            $date = Carbon::now()->startOfWeek()->addDays($i);
            $revenue = DriverRevenue::where('driver_id', $driverId)
                ->where('status', '!=', 'pending')
                ->whereDate('calculation_date', $date)
                ->sum('net_amount');
            
            $data[] = [
                'day' => $days[$i],
                'amount' => (float) $revenue,
            ];
        }
        
        return $data;
    }

    
    /**
     * Calculate monthly revenue for driver
     * 
     * @param int $driverId
     * 
     * @return array
     */
    private function getMonthlyRevenueData(int $driverId): array
    {
        $data = [];
        
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $revenue = DriverRevenue::where('driver_id', $driverId)
                ->where('status', '!=', 'pending')
                ->whereYear('calculation_date', $date->year)
                ->whereMonth('calculation_date', $date->month)
                ->sum('net_amount');
            
            $data[] = [
                'month' => $date->format('M'),
                'amount' => (float) $revenue,
            ];
        }
        
        return $data;
    }

    /**
     * Calculate yearly revenue for driver
     * 
     * @param int $driverId
     * 
     * @return array
     */
    private function getYearlyRevenueData(int $driverId): array
    {
        $data = [];
        
        for ($i = 4; $i >= 0; $i--) {
            $year = Carbon::now()->subYears($i);
            $revenue = DriverRevenue::where('driver_id', $driverId)
                ->where('status', '!=', 'pending')
                ->whereYear('calculation_date', $year->year)
                ->sum('net_amount');
            
            $data[] = [
                'year' => $year->format('Y'),
                'amount' => (float) $revenue,
            ];
        }
        
        return $data;
    }

    /**
     * Get average of fill rate pasengers in driver's bus
     * 
     * @param int $driverId
     * @param string $period
     * 
     * @return array
     */
    private function getFillRate(int $driverId, string $period): array
    {
        $query = Trip::whereHas('buse', function ($q) use ($driverId) {
            $q->where('driver_id', $driverId);
        })->where('status', 'completed');

        switch ($period) {
            case 'monthly':
                $query->where('departure_time', '>=', Carbon::now()->startOfMonth());
                break;
            case 'yearly':
                $query->where('departure_time', '>=', Carbon::now()->startOfYear());
                break;
            default:
                $query->where('departure_time', '>=', Carbon::now()->startOfWeek());
        }

        $trips = $query->with('buse')->get();
        
        $totalPassengers = 0;
        $totalCapacity = 0;
        $maxCapacity = 0;

        foreach ($trips as $trip) {
            $confirmedBookings = $trip->bookings()->where('status', 'confirmed')->get();
            
            $seatCount = $confirmedBookings->flatMap(function ($booking) {
                return $booking->bookingSeats ?? [];
            })->count();
            
            $passengerCount = $confirmedBookings->flatMap(function ($booking) {
                return $booking->bookingPassengers ?? [];
            })->count();
            
            $passengers = max($seatCount, $passengerCount);
            
            $capacity = $trip->buse->capacity ?? 0;
            
            $totalPassengers += $passengers;
            $totalCapacity += $capacity;
            $maxCapacity = max($maxCapacity, $capacity);
        }

        $avgPassengers = $trips->count() > 0 ? round($totalPassengers / $trips->count(), 1) : 0;
        $rate = $totalCapacity > 0 ? round(($totalPassengers / $totalCapacity) * 100) : 0;

        return [
            'rate' => $rate,
            'avg_passengers' => $avgPassengers,
            'max_capacity' => $maxCapacity,
        ];
    }
}
