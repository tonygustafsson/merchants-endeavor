<script lang="ts">
	import Inventory from '$lib/Inventory.svelte';
	import Time from '$lib/Time.svelte';
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
	<title>Inventory - Merchant's Endeavor</title>
</svelte:head>

<Time />

<Inventory />
