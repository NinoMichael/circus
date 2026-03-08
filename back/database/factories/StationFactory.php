<?php

namespace Database\Factories;

use App\Models\Station;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Station>
 */
class StationFactory extends Factory
{
    protected $model = Station::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company() . ' Station',
            'city' => fake()->randomElement([
                'Antananarivo',
                'Antsirabe',
                'Fianarantsoa',
                'Mahajanga',
                'Toamasina',
                'Toliara',
                'Antsiranana',
                'Morondava',
                'Nosy Be',
                'Manakara',
                'Mananjary',
                'Farafangana',
                'Sambava',
                'Antalaha',
                'Vohemar',
                'Ambanja',
                'Ambilobe',
                'Maevatanana',
                'Tsiroanomandidy',
                'Arivonimamo',
                'Betafo',
                'Ambositra',
                'Ambohimahasoa',
                'Ihosy',
                'Tolanaro',
                'Ambatondrazaka',
                'Moramanga',
                'Maroantsetra',
                'Andapa',
                'Betioky',
                'Bekily',
                'Ampanihy',
                'Maintirano',
                'Soalala',
                'Antsohihy',
                'Mandritsara',
                'Port-Bergé',
                'Mampikony',
                'Ambato-Boeny',
                'Brickaville',
                'Vangaindrano',
                'Ifanadiana',
                'Ikongo',
                'Manandriana',
                'Ankazobe'
            ]),
            'region' => fake()->randomElement([
                'Analamanga',
                'Vakinankaratra',
                'Alaotra-Mangoro',
                'Atsinanana',
                'Boeny',
                'Haute Matsiatra',
                'Diana',
                'Sava',
                'Menabe',
                'Anosy'
            ]),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'manager_user_id' => User::factory()->state([
                'role' => 'manager'
            ]),
            'image_cover' => fake()->imageUrl(800, 600, 'transport'),
        ];
    }
}
