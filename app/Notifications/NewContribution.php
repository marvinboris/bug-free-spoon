<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewContribution extends Notification
{
    use Queueable;

    private $contribution;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($contribution)
    {
        $this->contribution = $contribution;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('Nouvelle cotisation annuelle effectuée !')
            ->line($this->contribution->elder->name . ' (' . $this->contribution->elder->email . ') vient d\'envoyer sa cotisation annuelle.')
            ->action('La vérifier', url('/user/contributions/' . $this->contribution->id . '/edit'))
            ->line('Merci d\'utiliser notre application !');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
