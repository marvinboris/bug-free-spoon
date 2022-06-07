<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEldersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('elders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('school_id')->unsigned()->index()->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->text('title');
            $table->text('photo');
            $table->integer('promotion')->nullable();
            $table->text('payment')->nullable();
            $table->tinyInteger('paid')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('elders');
    }
}
