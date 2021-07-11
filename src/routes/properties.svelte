<script lang="ts">
	import Ships from '$lib/properties/Ships.svelte';
	import Businesses from '$lib/properties/Businesses.svelte';
	import Loans from '$lib/properties/Loans.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { game } from '../stores/game';
	import { routes } from '../constants/game';
	import { getUrl } from '../utils/url';

	onMount(() => {
		if (!$game.started) {
			goto(getUrl(routes.root));
		}
	});
</script>

<svelte:head>
	<title>Properties - Merchant's Endeavor</title>
</svelte:head>

<div class="app-properties">
	<h2>Properties</h2>

	<p>Here you will see a list of things you own, like ships, buildings, corporations and stocks.</p>

	<Ships />

	<Businesses />

	<Loans />
</div>
