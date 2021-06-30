<script lang="ts">
	export let name;
	export let label;
</script>

{#if label && label.length > 0}
	<label for={name}>{label}</label>
{/if}

<select {name} on:change on:blur>
	<slot />
</select>

<style>
	label {
		display: block;
		font-weight: bold;
		margin-bottom: 0.2em;
	}

	select {
		font-family: inherit;
		font-size: inherit;
		padding: 0.4em;
		margin: 0 0 0.5em 0;
		border: 1px solid #ccc;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
	}
</style>
