<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PersonController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/contacts', [PersonController::class, 'index'])->name('contacts');
    Route::get('/contacts/create', [PersonController::class, 'create'])->name('contacts.create');
    Route::post('/contacts', [PersonController::class, 'store'])->name('contacts.store');
    Route::get('/contacts/{person}/edit', [PersonController::class, 'edit'])->name('contacts.edit');
    Route::put('/contacts/{person}', [PersonController::class, 'update'])->name('contacts.update');
    Route::delete('/contacts/{person}', [PersonController::class, 'destroy'])->name('contacts.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';