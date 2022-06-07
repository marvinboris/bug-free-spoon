<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\Role;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $features = [
            [
                'name' => "CMS",
                'prefix' => 'cms',
            ],
            [
                'name' => "Users",
                'prefix' => 'users',
            ],
            [
                'name' => "Roles",
                'prefix' => 'roles',
            ],
            [
                'name' => "Features",
                'prefix' => 'features',
            ],
            [
                'name' => "Languages",
                'prefix' => 'languages',
            ],
            [
                'name' => "Events",
                'prefix' => 'events',
            ],
            [
                'name' => "Activities",
                'prefix' => 'activities',
            ],
            [
                'name' => "Elders",
                'prefix' => 'elders',
            ],
            [
                'name' => "Publications",
                'prefix' => 'publications',
            ],
            [
                'name' => "Subscribers",
                'prefix' => 'subscribers',
            ],
            [
                'name' => "Contributions",
                'prefix' => 'contributions',
            ],
            [
                'name' => "Schools",
                'prefix' => 'schools',
            ],
        ];

        foreach ($features as $feature) {
            Feature::create($feature);
        }

        foreach (Role::all() as $role) {
            foreach (Feature::all() as $feature) {
                $role->features()->attach($feature->id, [
                    'access' => json_encode(['c', 'u', 'd'])
                ]);
            }
        }
    }
}
