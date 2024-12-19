<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import type { Content } from '@prismicio/client';
	import IcBaselineCircle from '~icons/ic/baseline-circle';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap'; // Main GSAP library
	import ScrollTrigger from 'gsap/ScrollTrigger'; // Import ScrollTrigger directly

	gsap.registerPlugin(ScrollTrigger);

	export let slice: Content.TechListSlice;

	let component: HTMLElement;

	onMount(() => {
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: component,
				start: 'top bottom',
				end: 'bottom top',
				scrub: 4
			}
		});

		timeline.fromTo(
			'.tech-row',
			{
				x: (index) => {
					return index % 2 === 0 ? gsap.utils.random(450, 550) : gsap.utils.random(-550, -450);
				}
			},
			{
				x: (index) => {
					return index % 2 === 0 ? gsap.utils.random(-550, -450) : gsap.utils.random(450, 550);
				}
			}
		);
	});
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="overflow-hidden"
	bind:this={component}
>
	<Bounded as="div">
		<Heading size="xl" class="mb-8" tag="h2">{slice.primary.heading}</Heading>
	</Bounded>

	{#each slice.primary.tech as item}
		<div
			class="tech-row whitespace-nowrap mb-8 flex items-center justify-center gap-4 text-slate-700"
			aria-label={item.tech_name || undefined}
		>
			{#each Array(15) as _, index}
				<span
					class="tech-item text-3xl md:text-8xl font-extrabold uppercase tracking-tighter"
					style="color: {index === 7 && item.tech_color ? item.tech_color : 'inherit'};"
					>{item.tech_name}</span
				>
				<span class="text-lg md:text-3xl"><IcBaselineCircle /></span>
			{/each}
		</div>
	{/each}
</section>
