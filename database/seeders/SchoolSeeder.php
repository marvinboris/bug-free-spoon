<?php

namespace Database\Seeders;

use App\Models\School;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $schools = [
            [
                'name' => 'Ecole des Sciences et de la Santé',
                'abbr' => 'ESS',
                'link' => 'https://www.ess-ucac.org/',
            ],
            [
                'name' => 'Institut Catholique de Yaoundé',
                'abbr' => 'ICY',
                'link' => 'https://ucac-icy.net/',
            ],
            [
                'name' => 'Institut Catholique d\'Arts et Métiers',
                'abbr' => 'UCAC-ICAM',
                'link' => 'https://www.ucac-icam.com/',
            ],
            [
                'name' => 'Institut Supérieur d\'Agronomie d\'Afrique Centrale',
                'abbr' => 'ISAAC',
            ],
            [
                'name' => 'ISSPAC',
                'abbr' => 'ISSPAC',
            ],
            [
                'name' => 'ISSVAC',
                'abbr' => 'ISSVAC',
            ],
        ];

        foreach ($schools as $school) {
            School::create($school);
        }
    }
}
