<?php

use App\Http\Controllers\UtilController;
use Illuminate\Http\Request;
use App\Models\Language;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('User')->prefix('user')->name('user.')->group(function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('forgot', 'AuthController@forgot')->name('forgot');
    Route::post('reset/{id}/{code}', 'AuthController@reset')->name('reset');

    Route::middleware('auth:api')->group(function () {
        Route::get('dashboard', 'DashboardController@index')->name('dashboard');

        Route::middleware('permission')->group(function () {
            Route::name('cms.')->prefix('cms')->namespace('CMS')->group(function () {
                Route::patch('global', 'GlobalController@patch')->name('global');
                Route::patch('general', 'GeneralController@patch')->name('general');
                Route::patch('components', 'ComponentsController@patch')->name('components');
                Route::patch('frontend', 'FrontendController@patch')->name('frontend');
                Route::patch('backend', 'BackendController@patch')->name('backend');
                Route::patch('auth', 'AuthController@patch')->name('auth');

                Route::name('index')->get('', function () {
                    $jsonString = file_get_contents(base_path('cms.json'));
                    $cms = json_decode($jsonString, true);

                    return response()->json([
                        'cms' => $cms,
                        'languages' => Language::all(),
                    ]);
                });
            });

            Route::prefix('features')->name('features.')->group(function () {
                Route::get('{feature}', 'FeatureController@show')->name('show');
            });

            Route::prefix('languages')->name('languages.')->group(function () {
                Route::get('{language}', 'LanguageController@show')->name('show');
            });

            Route::prefix('roles')->name('roles.')->group(function () {
                Route::get('info', 'RoleController@info')->name('info');
                Route::get('{role}', 'RoleController@show')->name('show');
            });

            Route::prefix('users')->name('users.')->group(function () {
                Route::get('info', 'UserController@info')->name('info');
                Route::get('{user}', 'UserController@show')->name('show');
            });

            Route::prefix('events')->name('events.')->group(function () {
                Route::get('{event}', 'EventController@show')->name('show');
            });

            Route::prefix('activities')->name('activities.')->group(function () {
                Route::get('{activity}', 'ActivityController@show')->name('show');
            });

            Route::prefix('elders')->name('elders.')->group(function () {
                Route::get('{elder}', 'ElderController@show')->name('show');
            });

            Route::prefix('publications')->name('publications.')->group(function () {
                Route::get('{publication}', 'PublicationController@show')->name('show');
            });

            Route::prefix('subscribers')->name('subscribers.')->group(function () {
                Route::get('{subscriber}', 'SubscriberController@show')->name('show');
            });

            Route::prefix('contributions')->name('contributions.')->group(function () {
                Route::get('info', 'ContributionController@info')->name('info');
                Route::get('{contribution}', 'ContributionController@show')->name('show');
            });



            Route::apiResources([
                'users' => 'UserController',
                'roles' => 'RoleController',
                'features' => 'FeatureController',
                'languages' => 'LanguageController',
                'events' => 'EventController',
                'activities' => 'ActivityController',
                'elders' => 'ElderController',
                'publications' => 'PublicationController',
                'subscribers' => 'SubscriberController',
                'contributions' => 'ContributionController',
            ]);
        });
    });
});

Route::middleware('auth:admin,customer,api')->group(function () {
    Route::get('logout', 'UtilController@logout')->name('logout');
    Route::get('user', 'UtilController@account')->name('user');

    Route::prefix('notifications')->name('notifications.')->group(function () {
        Route::get('{notification}', 'UtilController@notification')->name('show');
        Route::get('', 'UtilController@notifications')->name('index');
    });

    Route::name('export.')->prefix('export')->group(function () {
        Route::name('xlsx')->post('xlsx', 'ExportController@xlsx');
        Route::name('csv')->post('csv', 'ExportController@csv');
        Route::name('pdf')->post('pdf', 'ExportController@pdf');
    });

    Route::prefix('content')->name('content.')->group(function () {
        Route::get('language/{language}', function ($id) {
            $user = UtilController::get(request());

            $jsonString = file_get_contents(base_path('cms.json'));
            $cmsFile = json_decode($jsonString, true);

            $language = Language::find($id);
            if (!$language) return response()->json([
                'message' => UtilController::message($cmsFile['pages'][$user->language->abbr]['messages']['languages']['not_found'], 'danger')
            ]);

            $user->update([
                'language_id' => $id
            ]);

            $cms = [
                'global' => $cmsFile['global'],
                'pages' => $cmsFile['pages'][$language->abbr],
            ];

            return response()->json([
                'language' => $language->toArray(),
                'cms' => $cms,
            ]);
        })->name('language');
    });
});

Route::prefix('content')->name('content.')->group(function () {
    Route::get('{language}', function ($lang) {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cmsFile = json_decode($jsonString, true);

        $abbr = $lang;
        if (Language::whereAbbr($lang)->count() === 0) $abbr = env('MIX_DEFAULT_LANG', 'en');

        $cms = [
            'global' => $cmsFile['global'],
            'pages' => $cmsFile['pages'][$abbr],
        ];
        $languages = Language::all();

        return response()->json([
            'cms' => $cms,
            'languages' => $languages,
        ]);
    })->name('cms');
});

Route::name('frontend.')->group(function () {
    Route::prefix('events')->name('events.')->group(function () {
        Route::get('{event}', 'FrontendController@event')->name('show');
    });

    Route::prefix('activities')->name('activities.')->group(function () {
        Route::get('{activity}', 'FrontendController@activity')->name('show');
        Route::get('', 'FrontendController@activities')->name('index');
    });

    Route::prefix('publications')->name('publications.')->group(function () {
        Route::get('{publication}', 'FrontendController@publication')->name('show');
        Route::get('', 'FrontendController@publications')->name('index');
    });

    Route::post('contact', 'FrontendController@contact')->name('contact');

    Route::get('opportunities', 'FrontendController@opportunities')->name('opportunities');

    Route::get('committee', 'FrontendController@committee')->name('committee');

    Route::get('alumni-call', 'FrontendController@alumni_call')->name('alumni_call');

    Route::post('join', 'FrontendController@join')->name('join');
    Route::post('subscribe', 'FrontendController@newsletter')->name('newsletter');
    Route::get('home', 'FrontendController@home')->name('home');
});
