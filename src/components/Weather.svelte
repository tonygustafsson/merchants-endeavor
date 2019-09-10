<script>
    import { weather } from '../stores/weather.js';
</script>

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

<span class="weather-symbol" title="{$weather} / 5">
    {#if $weather === 5}
        🌞
    {:else if $weather === 4}
        🌤
    {:else if $weather === 3}⛅{:else if $weather === 2}🌥{:else if $weather === 1}🌧{:else if $weather === 0}⛈{/if}
</span>
