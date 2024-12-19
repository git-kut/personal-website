<script lang="ts">
	import {
		asImageSrc,
		isFilled,
		type Content,
		type ImageField,
		type KeyTextField
	} from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import type { Action } from 'svelte/action';
	import IcBaselineArrowOutward from '~icons/ic/baseline-arrow-outward';
	import { gsap } from 'gsap';
	import Fa6BrandsGithub from '~icons/fa6-brands/github';
	import HugeiconsGlobe02 from '~icons/hugeicons/globe-02';
	import ScrollTrigger from 'gsap/ScrollTrigger';

	export let items: Content.BlogpostDocument[] | Content.ProjectDocument[];
	export let fallbackItemImage: ImageField;
	export let viewMoreText: KeyTextField = 'Read Content';
	let lastMousePosition = { x: 0, y: 0 };
	let currentIndex: number | undefined;

	gsap.registerPlugin(ScrollTrigger);
	// Sorting by Date
	$: sortedItems = [...items].sort((a, b) => {
		const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
		const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
		return dateB - dateA; // Descending order
	});

	// Mapping the images based on Sorted Items
	$: contentImages = sortedItems.map((item) => {
		const image = isFilled.image(item.data.hover_image) ? item.data.hover_image : fallbackItemImage;
		return asImageSrc(image, { fit: 'fill', w: 220, h: 320, exp: -10 });
	});

	gsap.registerPlugin(ScrollTrigger);

	const onItemEnter: Action<HTMLElement, number> = (node, index) => {
		gsap.fromTo(
			node,
			{ opacity: 0, y: 20 },
			{
				opacity: 1,
				y: 0,
				duration: 1,
				ease: 'elastic.out(1, 0.3)'
				/* scrollTrigger: {
					trigger: node,
					start: 'top bottom-=400px',
					end: 'bottom center',
					toggleActions: 'play none none none'
				} */
			}
		);

		const imageUrl = contentImages[index];
		if (imageUrl) {
			const img = new Image();
			img.src = imageUrl;
		}

		return { destroy() {} };
	};

	const handleMouseMove = (e: MouseEvent) => {
		const mousePosition = { x: e.clientX, y: e.clientY + window.scrollY };
		const speed = Math.sqrt(Math.pow(mousePosition.x - lastMousePosition.x, 2));

		const maxY = window.scrollY + window.innerHeight - 350;
		const maxX = window.innerWidth - 250;

		gsap.to('.hover-reveal', {
			x: gsap.utils.clamp(0, maxX, mousePosition.x - 110),
			y: gsap.utils.clamp(0, maxY, mousePosition.y - 160),
			rotation: speed * (mousePosition.x > lastMousePosition.x ? 1 : -1),
			ease: 'back.out(2)',
			duration: 1.3
		});

		lastMousePosition = mousePosition;
	};

	const onMouseEnter = (index: number) => {
		currentIndex = index;

		gsap.fromTo(
			'.hover-reveal',
			{ opacity: 0, scale: 0.8, rotation: 0 },
			{
				opacity: 1,
				scale: 1,
				rotation: 0,
				duration: 0.8,
				ease: 'power3.out'
			}
		);
	};

	const onMouseLeave = () => {
		gsap.fromTo(
			'.hover-reveal',
			{ opacity: 1, scale: 1 },
			{
				opacity: 0,
				scale: 0.8,
				duration: 0.5,
				ease: 'power3.in'
			}
		);

		currentIndex = undefined;
	};

	function isProject(
		item: Content.BlogpostDocument | Content.ProjectDocument
	): item is Content.ProjectDocument {
		// Explicitly check the type to distinguish projects
		return item.type === 'project' && 'isproject' in item.data;
	}
</script>

<svelte:window on:mousemove={handleMouseMove} />

<ul class="grid border-b border-b-slate-100" on:mouseleave={onMouseLeave}>
	{#each sortedItems as post, index (post.id + index)}
		<li
			class="content-list-item opacity-0"
			use:onItemEnter={index}
			on:mouseenter={() => onMouseEnter(index)}
		>
			{#if isProject(post)}
				<!-- Render for projects -->
				<div class="flex flex-row justify-between border-t border-t-slate-100 py-10 text-slate-200">
					<div class="flex flex-col gap-2">
						<span class="text-3xl font-bold">{post.data.title}</span>
						<div class="flex flex-wrap gap-3 text-yellow-400">
							{#each post.tags as tag}
								<span class="text-base md:text-lg font-bold">
									{tag}
								</span>
							{/each}
						</div>
					</div>
					<div class="ml-auto flex flex-col items-end gap-4 md:ml-0">
						{#if post.data.github_link}
							<PrismicLink
								class="flex items-center gap-2 text-xl font-medium"
								field={post.data.github_link}
							>
								<Fa6BrandsGithub />
								{post.data.github_link.text}
								<IcBaselineArrowOutward />
							</PrismicLink>
						{/if}
						{#if post.data.website_link}
							<PrismicLink
								class="flex items-center gap-2 text-xl font-medium"
								field={post.data.website_link}
							>
								<HugeiconsGlobe02 />
								{post.data.website_link.text}
								<IcBaselineArrowOutward />
							</PrismicLink>
						{/if}
					</div>
				</div>
			{:else}
				<!-- Render for blog posts -->
				<PrismicLink
					document={post}
					class="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
				>
					<div class="flex flex-col">
						<span class="text-3xl font-bold">{post.data.title}</span>
						<div class="flex gap-2 text-yellow-400">
							{#each post.tags as tag}
								<span class="text-sm md:text-lg font-bold shrink">
									{tag}
								</span>
							{/each}
						</div>
					</div>
					<div class="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
						<!-- Ensure this text is wrapped in the PrismicLink -->
						{viewMoreText}
						<IcBaselineArrowOutward />
					</div>
				</PrismicLink>
			{/if}
		</li>
	{/each}
</ul>

{#each items as post, index (post.id + index)}
	{#if isProject(post)}
		<div
			class="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[180px] w-[320px] rounded-lg bg-center bg-cover opacity-100 transition-[background] duration-300"
			style={currentIndex === undefined
				? ''
				: `background-image: url(${contentImages[currentIndex]})`}
		></div>
	{/if}
{/each}
