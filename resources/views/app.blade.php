<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="icon" href="{{ asset('images/logo-32x32.png') }}" sizes="32x32">
    <link rel="icon" href="{{ asset('images/logo-192x192.png') }}" sizes="192x192">
    <link rel="apple-touch-icon" href="{{ asset('images/logo-180x180.png') }}">
</head>
<body class="scrollbar-blue">
    <div id="app">
    </div>
</body>
</html>
