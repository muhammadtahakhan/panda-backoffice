## About Panda Back Office




### Features

- Laravel 9
- ReactJS 18
- Laravel Sanctum (SPA authentication)
- PHP Pest (testing library)
- TailwindCSS 3
- User authentication, signup, email verification ready to go out of the box
- Includes some basic ReactJS components to get you started

### Installation

You'll need to have a local development environment already setup. There's lots of ways to do this but I recommend using [Laravel Valet](https://laravel.com/docs/9.x/valet) or [Laravel Sail](https://laravel.com/docs/9.x/installation#laravel-and-docker).

Once you've got that squared away, follow the steps below to get setup.

1. Clone the repo with `git clone git@github.com:figoli-quinn/laravel-react-boilerplate`
2. Run `composer install` to install the PHP dependencies
3. Run `npm install` to install the JS dependencies
4. Copy the `.env.example` file to `.env`. Inside this new ENV file, you'll need to make sure to update the following settings:

- `APP_URL` - This should be the URL of your local development environment. If you're using Laravel Valet, this will be something like `http://laravel-react-boilerplate.test`
- `VITE_APP_URL` - This should match the `APP_URL` setting above` and allows the vite bundler, and through that, ReactJS to access the url of the site.
- `DB_DATABASE` - This should be the name of the database you want to use for the project.
- `DB_USERNAME` - This should be the username of the database user you want to use for the project.
- `DB_PASSWORD` - This should be the password of the database user you want to use for the project.
- `SESSION_DOMAIN` - This should match the domain of the environment you're using this on and allows the Sanctum cookies to work properly.
- `SANCTUM_STATEFUL_DOMAINS` - This should match the domain of the environment you're using this on and allows the Sanctum cookies to work properly.

5. Run `php artisan migrate:fresh` to run the database migrations
6. Run `npm run build` to build the JS and CSS assets.
7. Hopefully success! Try visiting the site in your web browser. You should see the homepage.




php artisan make:model Product -crR
