<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('driver_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('driver_id')->constrained('drivers')->onDelete('cascade');
            $table->foreignId('driver_revenue_id')->nullable()->constrained('driver_revenues')->onDelete('set null');
            $table->decimal('amount', 12, 2);
            $table->enum('payment_method', ['mvola', 'orange', 'airtel', 'stripe', 'cash']);
            $table->string('transaction_reference')->nullable();
            $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending');
            $table->dateTime('payment_date')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('driver_payments');
    }
};
