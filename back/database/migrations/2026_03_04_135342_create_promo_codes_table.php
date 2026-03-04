<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('promo_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->text('description');
            $table->enum('discount_type', ['percentage', 'fixed_amount']);
            $table->string('discount_value');
            $table->string('max_discount_value');
            $table->integer('usage_limit');
            $table->dateTime('valid_from');
            $table->dateTime('valid_until');
            $table->foreignId('cooperative_id')->nullable()->constrained('cooperatives')->onDelete('set null');
            $table->foreignId('trip_id')->nullable()->constrained('trips')->onDelete('set null');
            $table->boolean('is_active');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promo_codes');
    }
};
