<script>
    import { time } from '../stores/time.js';
    import { merchant } from '../stores/merchant';
    import { ucFirst } from '../utils/string';
</script>

<h2>{$merchant.name}</h2>

<p>
    <strong>Gender:</strong>
    {ucFirst($merchant.gender)}
    <br />
    <strong>Nationality:</strong>
    {#if $merchant.nationality === 'english'}
        🇬🇧
    {:else if $merchant.nationality === 'french'}
        🇫🇷
    {:else if $merchant.nationality === 'spanish'}🇪🇸{:else if $merchant.nationality === 'dutch'}🇧🇶{/if}
    {ucFirst($merchant.nationality)}
    <br />
    <strong>Doubloons:</strong>
    {$merchant.doubloons}
    <br />
    <strong>Started out:</strong>
    {$time.sinceStart}
</p>
