<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.ImageBlockSlice;
</script>

<PrismicImage
	field={slice.primary.image}
	class="not-prose justify-self-center md:w-6/12 md:h-6/12 rounded-md my-10 md:my-14 lg:my-16"
/>
