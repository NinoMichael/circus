<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('group')->default('general');
            $table->json('settings')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'group']);
            $table->index('group');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_settings');
    }
};
