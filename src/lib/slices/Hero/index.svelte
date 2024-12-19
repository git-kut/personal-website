<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Scene from './Scene.svelte';
	import { onMount } from 'svelte';
	import { elasticOut } from 'svelte/easing';
	import gsap from 'gsap';

	export let slice: Content.HeroSlice;

	const firstNameLetters = slice.primary.first_name?.split('') ?? '';
	const lastNameLetters = slice.primary.last_name?.split('') ?? '';

	onMount(() => {
		const timeline = gsap.timeline();
		timeline.fromTo(
			'.name-animation',
			{ x: -100, opacity: 0, rotate: -10 },
			{
				x: 0,
				opacity: 1,
				rotate: 0,
				ease: 'elastic.out(1, 0.3)',
				duration: 1,
				transformOrigin: 'left top',
				delay: 0.6,

				stagger: {
					each: 0.1,
					from: 'random'
				}
			}
		);

		timeline.fromTo(
			'.title',
			{ y: 20, opacity: 0, scale: 1.2 },
			{ y: 0, opacity: 1, scale: 1, ease: 'elastic.out(1, 0.3)', duration: 1 }
		);
	});
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="px-4 md:px-6"
>
	<div class="mx-auto w-full max-w-7xl">
		<div class="grid min-h-[65vh] grid-cols-1 items-center gap-x-[100px] md:grid-cols-2">
			<div
				class="relative z-10 row-span-1 row-start-1 -my-10 aspect-[1/1.3] overflow-hidden md:col-span-1 md:col-start-2 md:mt-0"
			>
				<Scene />
			</div>
			<div class="col-start-1 md:row-start-1">
				<h1
					class="mb-2 md:mb-8 text-[clamp(3rem,20vmin,13rem)] font-extrabold leading-none tracking-tighter text-nowrap select-none"
					aria-label={slice.primary.first_name + ' ' + slice.primary.last_name}
				>
					{#if firstNameLetters.length && lastNameLetters.length}
						<span class="block text-slate-300 -mt-[0.2em]">
							{#each firstNameLetters as letter}
								<span class="name-animation inline-block opacity-0">
									{letter}
								</span>
							{/each}
						</span>
					{/if}
					<span class="block text-slate-500 -mt-[0.2em]">
						{#each lastNameLetters as letter}
							<span class="name-animation inline-block opacity-0">
								{letter}
							</span>
						{/each}
					</span>
				</h1>
				<span
					class="title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-transparent text-2xl font-bold select-none uppercase tracking-[0.2em] md:text-4xl opacity-0"
				>
					{slice.primary.tag_line}
				</span>
			</div>
		</div>
	</div>
</section>
