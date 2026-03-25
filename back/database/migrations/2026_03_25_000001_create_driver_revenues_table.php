<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('driver_revenues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('driver_id')->constrained('drivers')->onDelete('cascade');
            $table->foreignId('trip_id')->constrained('trips')->onDelete('cascade');
            $table->decimal('gross_amount', 12, 2);
            $table->decimal('commission_amount', 12, 2)->default(0);
            $table->decimal('net_amount', 12, 2);
            $table->integer('passenger_count')->default(0);
            $table->decimal('fare_per_passenger', 12, 2)->default(0);
            $table->enum('status', ['pending', 'calculated', 'paid'])->default('pending');
            $table->date('calculation_date')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('driver_revenues');
    }
};
