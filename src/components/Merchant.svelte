<script>
    import { merchant } from '../stores/merchant';

    const firstCharUppercase = string => string.charAt(0).toUpperCase() + string.slice(1);
</script>

<h2>{$merchant.name}</h2>

<p>
    <strong>Gender:</strong>
    {firstCharUppercase($merchant.gender)}
    <br />
    <strong>Nationality:</strong>
    {#if $merchant.nationality === 'english'}
        🇬🇧
    {:else if $merchant.nationality === 'french'}
        🇫🇷
    {:else if $merchant.nationality === 'spanish'}🇪🇸{:else if $merchant.nationality === 'dutch'}🇧🇶{/if}
    {firstCharUppercase($merchant.nationality)}
    <br />
    <strong>Doubloons:</strong>
    {$merchant.doubloons}
</p>
