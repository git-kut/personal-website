<script lang="ts">
	import type { ImageField } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import clsx from 'clsx';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	export let image: ImageField;
	export let className: string = '';

	onMount(() => {
		gsap.fromTo(
			'.avatar',
			{ opacity: 0, scale: 1.4 },
			{ opacity: 1, scale: 1, duration: 1.3, ease: 'power3.inout' }
		);

		window.onmousemove = (e) => {
			if (!component) return;

			const componentRectangle = (component as HTMLElement).getBoundingClientRect();
			const componentCenterX = componentRectangle.left + componentRectangle.width / 2;

			let componentPercent = {
				x: (e.clientX - componentCenterX) / (componentRectangle.width / 2)
			};
			let distanceFromCenterX = 1 - Math.abs(componentPercent.x);

			gsap
				.timeline({ defaults: { duration: 0.5, overwrite: 'auto', ease: 'power3.out' } })
				.to('.avatar', { rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x) }, 0)
				.to(
					'.highlight',
					{ opacity: distanceFromCenterX - 0.4, x: -10 + 20 * componentPercent.x },
					0
				);
		};
	});

	let component: HTMLElement;
</script>

<div class={clsx('relative h-full w-full z-10', className)} bind:this={component}>
	<div class="avatar opacity-0 aspect-square overflow-hidden rounded-3xl border-2 border-slate-700">
		<PrismicImage
			field={image}
			class="avatar-image h-full w-full object-fill"
			imgixParams={{ q: 90 }}
		/>
		<div
			class="highlight absolute inset-0 w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"
		></div>
	</div>
</div>

<style>
	.avatar {
		perspective: 500px;
		perspective-origin: 150px, 150px;
	}
</style>
