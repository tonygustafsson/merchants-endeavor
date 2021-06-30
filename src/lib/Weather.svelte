<script lang="ts">
	import { weather } from '../stores/weather';
</script>

<span class="weather-symbol" title={$weather.name}>{$weather.icon}</span>

<style>
	.weather-symbol {
		position: fixed;
		top: 0;
		right: 10px;
		opacity: 0.9;
		font-size: 500%;
		user-select: none;
		z-index: -1;
	}

	@media (min-width: 1000px) {
		.weather-symbol {
			font-size: 1000%;
		}
	}
</style>
