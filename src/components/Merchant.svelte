<script>
    import { merchant } from '../stores/merchant';
</script>

<h2>{$merchant.name}</h2>

<p>
    <strong>Gender:</strong>
    {$merchant.gender}
    <br />
    <strong>Nationality:</strong>
    {$merchant.nationality}
    <br />
    <strong>Doubloons:</strong>
    {$merchant.doubloons}
</p>
