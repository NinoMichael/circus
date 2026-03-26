<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sessions', function (Blueprint $table) {
            $table->string('device_type')->nullable()->after('user_agent');
            $table->string('browser')->nullable()->after('device_type');
            $table->string('os')->nullable()->after('browser');
            $table->string('country')->nullable()->after('os');
            $table->string('city')->nullable()->after('country');
        });
    }

    public function down(): void
    {
        Schema::table('sessions', function (Blueprint $table) {
            $table->dropColumn(['device_type', 'browser', 'os', 'country', 'city']);
        });
    }
};
