<script lang="ts">
	import { clearDatabase } from '../utils/stateSync';
	import Button from '$lib/Button.svelte';

	const forgetEverything = () => {
		clearDatabase().then(() => {
			window.location.reload();
		});
	};
</script>

<div class="settings-panel">
	<Button on:click={forgetEverything}>Forget everything</Button>
</div>

<style>
	.settings-panel {
		text-align: right;
	}

	@media (min-width: 1000px) {
		.settings-panel {
			position: fixed;
			right: 10px;
			bottom: 10px;
		}
	}
</style>
