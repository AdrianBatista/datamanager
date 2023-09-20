# Dependencies

Make sure you have the following programs installed in your computer to run this code:

- PHP 8.2
- Composer 2.6
- NPM
- 7z


# Instalation

First clone this repository on your machine using the following command:

```
git clone https://github.com/AdrianBatista/datamanager.git
```

After cloning, create a .env file with .env.example and generate a new app key with the next command:

```
php artisan key:generate
```

For last, install PHP and Javascript packages:

``` 
composer install
npm install
```

# Running

To run the application, you need to run Laravel's server and run npm.

``` 
php artisan serve
npm run dev
```