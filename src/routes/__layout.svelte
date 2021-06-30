<script lang="ts">
	import { game } from '../stores/game';
	import { resolution } from '../stores/resolution';
	import { routes } from '../constants/game';
	import { goto } from '$app/navigation';
	import Notifications from '$lib/Notifications.svelte';
	import Inventory from '$lib/Inventory.svelte';
	import Time from '$lib/Time.svelte';
	import Settings from '$lib/Settings.svelte';
	import Weather from '$lib/Weather.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Loader from '$lib/Loader.svelte';
	import { page } from '$app/stores';

	import '../app.css';
</script>

<div class="app wrapper">
	<Loader />
	<Notifications />

	<header class="header">
		<h1
			on:click={() => {
				const route = $resolution.mobile ? routes.inventory : routes.properties;
				goto(route);
			}}
		>
			Merchant's Endeavor
		</h1>

		{#if $game.started && $page.path !== routes.root}
			{#if !$resolution.mobile}
				<Time />
			{/if}
			<Weather />
		{/if}
	</header>

	{#if $game.started && $page.path !== routes.root}
		<div class="nav">
			<Navigation />
		</div>
	{/if}

	<div class="content white-panel">
		<main>
			<slot />
		</main>
	</div>

	{#if $game.started && !$resolution.mobile}
		<div class="inventory white-panel">
			<Inventory />
		</div>
	{/if}

	<footer class="footer">
		Merchant's Endeavor &copy; {new Date().getFullYear()}
		{#if $game.started && $page.path !== routes.root}
			<Settings />
		{/if}
	</footer>
</div>

<style>
	.white-panel {
		background: rgba(255, 255, 255, 0.9);
	}
	h1 {
		text-shadow: 0px 0 20px #fff;
		margin: 0;
		cursor: pointer;
	}
	.footer {
		color: #fff;
		text-shadow: 0 0 10px #000;
	}
</style>
