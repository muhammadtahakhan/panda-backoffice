<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SceneTemplate>
 */
class SceneTemplateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->text(10),
            'description' => fake()->text(100),
            'render_time' => fake()->numberBetween(10, 30 * 60),
            'is_animated' => fake()->boolean(),
            'sizes' => [
                [
                    'width' => 100,
                    'height' => 100,
                ],
            ],
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function ($sceneTemplate) {

            $sceneTemplate->addMediaFromUrl('https://fakeimg.pl/800/')->toMediaCollection('scene-preview');
            $sceneTemplate->addMedia(storage_path('seeds/scene.zip'))->preservingOriginal()->toMediaCollection('scene-file');

            if ($sceneTemplate->is_animated) {
                $sceneTemplate->addMediaFromUrl('https://fakeimg.pl/800/')->toMediaCollection('animated-preview');
            }

            $templateFile = $sceneTemplate->templateFiles()->create([
                'name' => 'Template Name',
                'key' => 'texture-1',
            ]);

            $templateFile->addMedia(storage_path('seeds/test-template.afdesign'))->preservingOriginal()->toMediaCollection('template-files');
        });
    }
}
