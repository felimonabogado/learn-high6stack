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
        Schema::table('person', function (Blueprint $table) {
            //
             $table->foreignId('user_id')->constrained()->onDelete('cascade');
             $table->boolean('important')->default(true)->after('note'); // add column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('person', function (Blueprint $table) {
            //
        });
    }
};
