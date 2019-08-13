<script>
    $: loading = false;
</script>

<style>
    .loading {
        background: red;
        color: white;
        padding: 1em;
        font-weight: bold;
    }
</style>

{#if loading}
    <div class="loading">Loading...</div>
{/if}
