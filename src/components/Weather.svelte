<script>
    import { weather } from '../stores/weather.js';
</script>

<style>
    .weather-symbol {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.7;
        font-size: 1000%;
        user-select: none;
    }
</style>

<span class="weather-symbol" title="{$weather} / 5">
    {#if $weather === 5}
        🌞
    {:else if $weather === 4}
        🌤
    {:else if $weather === 3}⛅{:else if $weather === 2}🌥{:else if $weather === 1}🌧{:else}⛈{/if}
</span>
