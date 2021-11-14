<script lang="ts">
	import { resolution } from '../stores/resolution';
	import { routes } from '../constants/game';
	import { page } from '$app/stores';
	import { getUrl } from '../utils/url';
</script>

<nav>
	<ul>
		{#if $resolution.mobile}
			<li class:active={$page?.path === routes.inventory}>
				<a href={getUrl(routes.inventory)}> Inventory</a>
			</li>
		{/if}
		<li class:active={$page?.path === routes.properties || $page.path === routes.ship}>
			<a href={getUrl(routes.properties)}> Properties</a>
		</li>
		<li class:active={$page?.path === routes.staff}>
			<a href={getUrl(routes.staff)}>Staff</a>
		</li>
		<li class:active={$page?.path === routes.goods}>
			<a href={getUrl(routes.goods)}>Goods</a>
		</li>
		<li class:active={$page?.path === routes.logs}>
			<a href={getUrl(routes.logs)}>Logs</a>
		</li>
	</ul>
</nav>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: 100%;
		font-family: 'Redressed', cursive;
	}
	li {
		display: inline;
		margin-right: 0.5em;
	}
	li.active a {
		text-decoration: underline;
	}
	@media (min-width: 1000px) {
		ul {
			font-size: 170%;
		}
		li {
			margin-right: 1em;
		}
	}
</style>
