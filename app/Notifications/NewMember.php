<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewMember extends Notification
{
    use Queueable;

    private $elder;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($elder)
    {
        $this->elder = $elder;
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
            ->greeting('Nouvelle candidature d\'adhésion !')
            ->line($this->elder->name . ' (' . $this->elder->email . ') vient d\'envoyer sa candidature pour devenir membre de la Fiducac.')
            ->action('La vérifier', url('/user/elders/' . $this->elder->id . '/edit'))
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
