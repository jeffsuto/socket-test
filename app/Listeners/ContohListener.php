<?php

namespace App\Listeners;

use App\Events\Contoh;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContohListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Contoh  $event
     * @return void
     */
    public function handle(Contoh $event)
    {
        //
    }
}
