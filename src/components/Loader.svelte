<script>
    import { fade } from 'svelte/transition';
    import { game } from '../stores/game';

    let loading = false;

    game.subscribe(game => {
        loading = game.loading;
    });
</script>

<style>
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.3);
        z-index: 1;
        cursor: wait;
    }
    .loading-text {
        position: absolute;
        top: calc(50% - 1em);
        width: 100%;
        text-align: center;
        margin: 0;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.6);
        font-family: 'Redressed', cursive;
        font-size: 500%;
    }
</style>

{#if loading}
    <div transition:fade={{ duration: 150 }} class="overlay">
        <p class="loading-text">Loading...</p>
    </div>
{/if}
