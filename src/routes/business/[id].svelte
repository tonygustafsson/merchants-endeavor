<script lang="ts">
	import { businesses } from '../../stores/businesses';
	import { game } from '../../stores/game';
	import BusinessActions from '$lib/business/BusinessActions.svelte';
	import BusinessContents from '$lib/business/BusinessContents.svelte';
	import { time } from '../../stores/time';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { routes } from '../../constants/game';
	import { page } from '$app/stores';

	$: business = $businesses.find(s => s.id === $page.params.id);

	onMount(() => {
		if (!$game.started) {
			goto(routes.root);
		}
	});
</script>

<div class="app-business">
	<p>
		<a href="/properties">&lt; Back to Properties</a>
	</p>

	{#if business}
		<h2>Business: {business.name}</h2>

		<p>Created {$time.getTimeAtTick(business.created)}</p>
		<p>Profit: {business.profit} dbl</p>

		<BusinessActions {business} />

		<BusinessContents {business} />
	{:else}
		<p>Business not found.</p>
	{/if}
</div>
