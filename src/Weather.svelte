<script>
    import { weather } from './stores/weather.js';
</script>

<style>
    .weather-symbol {
        font-size: 300%;
    }
</style>

<span class="weather-symbol" title="{$weather} / 5">
    {#if $weather === 5}
        🌞
    {:else if $weather === 4}
        🌤
    {:else if $weather === 3}⛅{:else if $weather === 2}🌥{:else if $weather === 1}🌦{:else}🌧{/if}
</span>
