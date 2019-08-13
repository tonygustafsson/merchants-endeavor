<script>
    import { merchant } from '../stores/merchant';
</script>

<h3>About you</h3>

<p>
    <strong>Name:</strong>
    {$merchant.name}
    <br />
    <strong>Nationality:</strong>
    {$merchant.nationality}
    <br />
    <strong>Doubloons:</strong>
    {$merchant.doubloons}
</p>
