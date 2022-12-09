<?php

namespace Database\Factories;

use App\Enums\RenderStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RenderJob>
 */
class RenderJobFactory extends Factory
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
            'status' => fake()->randomElement(RenderStatusEnum::cases()),
            'size' => [
                'width' => 100,
                'height' => 100,
            ],
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function ($renderJob) {
            $sceneTemplate = $renderJob->sceneTemplate;

            $sceneTemplate->templateFiles->each(function ($templateFile) use ($renderJob) {
                $renderJobTexture = $renderJob->textures()->make();
                $renderJobTexture->sceneTemplateFile()->associate($templateFile);
                $renderJobTexture->renderJob()->associate($this);
                $renderJobTexture->save();

                $renderJobTexture->addMediaFromUrl('https://fakeimg.pl/300/')->toMediaCollection('render-job-texture');
            });
        });
    }
}
