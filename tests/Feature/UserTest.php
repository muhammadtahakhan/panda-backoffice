<?php

use App\Models\User;
use Illuminate\Support\Facades\Notification;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('it can authenicate', function () {

    $credentials = [
        'email' => 'stevenquinn@me.com',
        'password' => 'Test12345!',
    ];

    $this->get('/sanctum/csrf-cookie');
    $this->post('/api/login', $credentials)
        ->assertStatus(200);

});

it('it can register a new user', function() {

    Notification::fake();

    // Start the registration.
    $this->json('post', '/api/register', [
        'name' => 'Steven Quinn',
        'email' => 'stevenquinn@me.com',
        'password' => 'Test12345!',
        'password_confirmation' => 'Test12345!',
    ])->assertStatus(201);
    
    $this->assertDatabaseHas('users', [
        'email' => 'stevenquinn@me.com',
    ]);

    Notification::assertSentTo(
        [User::where('email', 'stevenquinn@me.com')->first()],
        \App\Notifications\VerifyEmailNotification::class
    );
});