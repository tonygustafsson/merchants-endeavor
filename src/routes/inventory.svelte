<script lang="ts">
	import Inventory from '$lib/Inventory.svelte';
	import Time from '$lib/Time.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { game } from '../stores/game';
	import { routes } from '../constants/game';

	onMount(() => {
		if (!$game.started) {
			goto(routes.root);
		}
	});
</script>

<Time />

<Inventory />
